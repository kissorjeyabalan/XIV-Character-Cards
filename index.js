const fetch = require("node-fetch");
const express = require('express');
const app = express();
const config = require('config');

const port = process.env.PORT || config.get('app.port');

const { CardCreator } = require('./create-card');

const creator = new CardCreator();

// node cachemanager
var cacheManager = require('cache-manager');
// storage for the cachemanager
var fsStore = require('cache-manager-fs-binary');
// initialize caching on disk
var diskCache = cacheManager.caching({
    store: fsStore,
    options: {
        reviveBuffers: true,
        binaryAsStream: false,
        ttl: config.get('app.cachettl') /* seconds */,
        maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
        path: 'diskcache',
        preventfill: true
    }
});

async function getCharIdByName(world, name, retries = 1) {
    if (retries === -1) return undefined;

    const response = await fetch(`https://xivapi.com/character/search?name=${name}&server=${world}&private_key=${config.get('xivapi.token')}`);
    const data = await response.json();

    if (data.Results[0] === undefined)
        return getCharIdByName(world, name, --retries);

    return data.Results[0].ID;
}

app.get('/prepare/id/:charaId', async (req, res) => {
    var cacheKey = `img:${req.params.charaId}`;
    var ttl = config.get('app.cachettl'); 

    diskCache.wrap(cacheKey,
        // called if the cache misses in order to generate the value to cache
        function (cb) {
            creator.ensureInit().then(() => creator.createCard(req.params.charaId), (reason) => cb('Init failed: ' + reason, null)).then(image => cb(null, {
                binary: {
                    image: image,
                }
            })).catch((reason) => cb('createCard failed: ' + reason, null));
        },
        // Options, see node-cache-manager for more examples
        { ttl: ttl },
        function (err, result) {
            if (err !== null) {
                console.error(err);
                res.status(500).send({status: "error", reason: err});
                return;
            }

            res.status(200).send({status: "ok", url: `/characters/id/${req.params.charaId}.png`});
        }
    );
})

app.get('/prepare/equipments/id/:charaId', async (req, res) => {
    var cacheKey = `img:eq:${req.params.charaId}`;
    var ttl = config.get('app.cachettl');

    diskCache.wrap(cacheKey,
        // called if the cache misses in order to generate the value to cache
        function (cb) {
            creator.ensureInit().then(() => creator.createEquipmentCard(req.params.charaId), (reason) => cb('Init failed: ' + reason, null)).then(image => cb(null, {
                binary: {
                    image: image,
                }
            })).catch((reason) => cb('createEquipmentCard failed: ' + reason, null));
        },
        // Options, see node-cache-manager for more examples
        { ttl: ttl },
        function (err, result) {
            if (err !== null) {
                console.error(err);
                res.status(500).send({status: "error", reason: err});
                return;
            }

            res.status(200).send({status: "ok", url: `/characters/equipments/id/${req.params.charaId}.png`});
        }
    );
})

app.get('/prepare/name/:world/:charName', async (req, res) => {
    var id = await getCharIdByName(req.params.world, req.params.charName);

    if (id === undefined) {
        res.status(404).send("Character not found.");
        return;
    }

    res.redirect(`/prepare/id/${id}`);
})

app.get('/prepare/equipments/name/:world/:charName', async (req, res) => {
    var id = await getCharIdByName(req.params.world, req.params.charName);

    if (id === undefined) {
        res.status(404).send("Character not found.");
        return;
    }

    res.redirect(`/prepare/equipments/id/${id}`);
})

app.get('/characters/id/:charaId.png', async (req, res) => {
    var cacheKey = `img:${req.params.charaId}`;
    var ttl = config.get('app.cachettl');

    diskCache.wrap(cacheKey,
        // called if the cache misses in order to generate the value to cache
        function (cb) {
            creator.ensureInit().then(() => creator.createCard(req.params.charaId), (reason) => cb('Init failed: ' + reason, null)).then(image => cb(null, {
                binary: {
                    image: image,
                }
            })).catch((reason) => cb('createCard failed: ' + reason, null));
        },
        // Options, see node-cache-manager for more examples
        { ttl: ttl },
        function (err, result) {
            if (err !== null) {
                console.error(err);
                res.status(500).send({status: "error", reason: err});
                return;
            }

            var image = result.binary.image;

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': image.length,
                'Cache-Control': 'public, max-age=' + config.get('app.cachettl')
            });

            res.end(image, 'binary');

            var usedStreams = ['image'];
            // you have to do the work to close the unused files
            // to prevent file descriptors leak
            for (var key in result.binary) {
                if (!result.binary.hasOwnProperty(key)) continue;
                if (usedStreams.indexOf(key) < 0
                    && result.binary[key] instanceof Stream.Readable) {
                    if (typeof result.binary[key].close === 'function') {
                        result.binary[key].close(); // close the stream (fs has it)
                    } else {
                        result.binary[key].resume(); // resume to the end and close
                    }
                }
            }
        }
    );
})

app.get('/characters/equipments/id/:charaId.png', async (req, res) => {
    var cacheKey = `img:eq:${req.params.charaId}`;
    var ttl = config.get('app.cachettl');

    diskCache.wrap(cacheKey,
        // called if the cache misses in order to generate the value to cache
        function (cb) {
            creator.ensureInit().then(() => creator.createEquipmentCard(req.params.charaId), (reason) => cb('Init failed: ' + reason, null)).then(image => cb(null, {
                binary: {
                    image: image,
                }
            })).catch((reason) => cb('createEquipmentCard failed: ' + reason, null));
        },
        // Options, see node-cache-manager for more examples
        { ttl: ttl },
        function (err, result) {
            if (err !== null) {
                console.error(err);
                res.status(500).send({status: "error", reason: err});
                return;
            }

            var image = result.binary.image;

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': image.length,
                'Cache-Control': 'public, max-age=' + config.get('app.cachettl')
            });

            res.end(image, 'binary');

            var usedStreams = ['image'];
            // you have to do the work to close the unused files
            // to prevent file descriptors leak
            for (var key in result.binary) {
                if (!result.binary.hasOwnProperty(key)) continue;
                if (usedStreams.indexOf(key) < 0
                    && result.binary[key] instanceof Stream.Readable) {
                    if (typeof result.binary[key].close === 'function') {
                        result.binary[key].close(); // close the stream (fs has it)
                    } else {
                        result.binary[key].resume(); // resume to the end and close
                    }
                }
            }
        }
    );
})

app.get('/characters/id/:charaId', async (req, res) => {
    res.redirect(`/characters/id/${req.params.charaId}.png`);
})

app.get('/characters/equipments/id/:charaId', async (req, res) => {
    res.redirect(`/characters/equipments/id/${req.params.charaId}.png`);
})

app.get('/characters/name/:world/:charName.png', async (req, res) => {
    var id = await getCharIdByName(req.params.world, req.params.charName);

    if (id === undefined) {
        res.status(404).send("Character not found.");
        return;
    }

    res.redirect(`/characters/id/${id}.png`);
})

app.get('/characters/equipments/name/:world/:charName.png', async (req, res) => {
    var id = await getCharIdByName(req.params.world, req.params.charName);

    if (id === undefined) {
        res.status(404).send("Character not found.");
        return;
    }

    res.redirect(`/characters/equipments/id/${id}.png`);
})


app.get('/characters/name/:world/:charName', async (req, res) => {
    res.redirect(`/characters/name/${req.params.world}/${req.params.charName}.png`);
})

app.get('/characters/equipments/name/:world/:charName', async (req, res) => {
    res.redirect(`/characters/equipments/name/${req.params.world}/${req.params.charName}.png`);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})