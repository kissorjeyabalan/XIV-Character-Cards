const fetch = require("node-fetch");
const path = require("path");
const { createCanvas, loadImage, registerFont } = require("canvas");
const config = require('config');

function absolute(relativePath) {
  return path.join(__dirname, relativePath);
}

registerFont(absolute('SourceSansPro-Regular.ttf'), { family: 'Source Sans Pro', style: 'Regular' });
registerFont(absolute('SourceSansPro-SemiBold.ttf'), { family: 'Source Sans Pro', style: 'SemiBold' });

const primary = "rgba(178, 214, 249, 1)";
const white = "rgba(255, 255, 255,1)";
const grey = "#868686";
const black = "rgba(0,0,0,0.5)";
const copyright = '"11px "Source Sans Pro"';
const small = '"18px "Source Sans Pro"';
const med = '30px "Source Sans Pro"';
const smed = '25px "Source Sans Pro"';
const large = '45px "Source Sans Pro SemiBold"';

const jobsRowTextStartX = 495;
const jobsRowTextSize = 30;
const jobsRowTextSpacer = jobsRowTextSize * 2;

const rectHeightRow1 = 120; // Title, Name, World
const rectHeightRow2 = 40; // Mounts, Minions
const rectHeightRow3 = 215; // Info
const rectHeightRow4 = 120; // Jobs
const rectHeightRow5 = 175; // Jobs

const rectSpacing = 8;
const rectHalfWidthSpacing = 10;

const rectFullWidth = 400;
const rectHalfWidth = (rectFullWidth / 2) - (rectHalfWidthSpacing / 2);

const rectStartX = 464;
const rectStartXHalf = rectStartX + rectHalfWidth + rectHalfWidthSpacing;

const rectStartRow1Y = 0;
const rectStartRow2Y = rectStartRow1Y + rectHeightRow1 + rectSpacing;
const rectStartRow3Y = rectStartRow2Y + rectHeightRow2 + rectSpacing;
const rectStartRow4Y = rectStartRow3Y + rectHeightRow3 + rectSpacing;
const rectStartRow5Y = rectStartRow4Y + rectHeightRow4 + rectSpacing;

const jobsStartSpacing = 10;
const jobsRowSpacing = 8;

const jobsRowIcon1Y = rectStartRow5Y + jobsStartSpacing;
const jobsRowText1Y = jobsRowIcon1Y + 45;

const jobsRowIcon2Y = jobsRowText1Y + jobsRowSpacing;
const jobsRowText2Y = jobsRowIcon2Y + 45;

const jobsRowIcon3Y = jobsRowText2Y + jobsRowSpacing;
const jobsRowText3Y = jobsRowIcon3Y + 45;

const textTitleY = rectStartRow1Y + 34;
const textServerY = rectStartRow1Y + 104;
const textNameNoTitleY = rectStartRow1Y + 59;
const textNameTitleY = rectStartRow1Y + 79;

const textMountMinionY = rectStartRow2Y + 28;
const iconMountMinionY = rectStartRow2Y + 5;

const deityIconY = rectStartRow3Y + 69;
const deityIconX = 805;

const gcRankIconY = rectStartRow3Y + 110;
const gcRankIconX = 799;

const fcCrestScale = 38;
const fcCrestY = rectStartRow3Y + 162;
const fcCrestX = 800;

const infoTextStartSpacing = 22;
const infoTextSmallStartY = rectStartRow3Y + infoTextStartSpacing;
const infoTextBigStartY = infoTextSmallStartY + 25;
const infoTextSpacing = 50;

const equipImgSize = 41;
const equipSpacing = equipImgSize + equipImgSize;
const equipY = 41;

const equipLeftImageStartX = 15;
const equipRightImageStartX = 890 - equipImgSize - 15;

const equipIlvlY = equipY + 17;
const equipLeftTextStartX = equipLeftImageStartX + 45;
const equipRightTextStartX = equipRightImageStartX - 5;

const equipItemNameY = equipIlvlY + 17;
const equpMirageNameY = equipItemNameY + 17;

class CardCreator {
  /**
   * Creates a new card creator.
   * @constructor
   */
  constructor() {
    this.isInit = false;
  }

  /**
   * @typedef {Object} CardCreator~CanvasDimensions
   * @property {number} width The width of the canvas.
   * @property {number} height The height of the canvas.
   */

  /**
   * The canvas's dimensions.
   * @type {CardCreator~CanvasDimensions}
   */
  get canvasSize() {
    return {
      width: 890,
      height: 720,
    };
  }

  /**
   * Ensures that the instance is ready to generate character cards.
   * This function must be resolved before using character card
   * generation methods.
   * @returns {Promise} A promise representing the initialization state of this generator.
   */
  async ensureInit() {
    if (this.isInit) {
      return;
    }

    await this.init();
    this.isInit = true;
  }

  async init() {
    var d = new Date();
    this.copyrightYear = d.getFullYear();

    this.bgImage = await loadImage(absolute("./chara_top.png"));
    this.bgImageCenter = await loadImage(absolute("./chara_center_c.png"))


    this.imgMinion = await loadImage(absolute("./minion.png"));
    this.imgMount = await loadImage(absolute("./mount.png"));
    this.imgIlvl = await loadImage(absolute("./ilvl_n.png"));
    this.imgShadow = await loadImage(absolute("./shadow.png"));

    this.imgAlchemist = await loadImage(absolute("./cj/1/alchemist.png"));
    this.imgArmorer = await loadImage(absolute("./cj/1/armorer.png"));
    this.imgBlacksmith = await loadImage(absolute("./cj/1/blacksmith.png"));
    this.imgCarpenter = await loadImage(absolute("./cj/1/carpenter.png"));
    this.imgCulinarian = await loadImage(absolute("./cj/1/culinarian.png"));
    this.imgGoldsmith = await loadImage(absolute("./cj/1/goldsmith.png"));
    this.imgLeatherworker = await loadImage(absolute("./cj/1/leatherworker.png"));
    this.imgWeaver = await loadImage(absolute("./cj/1/weaver.png"));

    this.imgBotanist = await loadImage(absolute("./cj/1/botanist.png"));
    this.imgFisher = await loadImage(absolute("./cj/1/fisher.png"));
    this.imgMiner = await loadImage(absolute("./cj/1/miner.png"));

    this.imgGladiator = await loadImage(absolute("./cj/1/gladiator.png"));
    this.imgPaladin = await loadImage(absolute("./cj/1/paladin.png"));
    this.imgMarauder = await loadImage(absolute("./cj/1/marauder.png"));
    this.imgWarrior = await loadImage(absolute("./cj/1/warrior.png"));
    this.imgDarkKnight = await loadImage(absolute("./cj/1/darkknight.png"));
    this.imgGunbreaker = await loadImage(absolute("./cj/1/gunbreaker.png"));

    this.imgConjurer = await loadImage(absolute("./cj/1/conjurer.png"));
    this.imgWhitemage = await loadImage(absolute("./cj/1/whitemage.png"));
    this.imgScholar = await loadImage(absolute("./cj/1/scholar.png"));
    this.imgAstrologian = await loadImage(absolute("./cj/1/astrologian.png"));

    this.imgArcher = await loadImage(absolute("./cj/1/archer.png"));
    this.imgBard = await loadImage(absolute("./cj/1/bard.png"));
    this.imgMachinist = await loadImage(absolute("./cj/1/machinist.png"));
    this.imgDancer = await loadImage(absolute("./cj/1/dancer.png"));

    this.imgLancer = await loadImage(absolute("./cj/1/lancer.png"));
    this.imgDragoon = await loadImage(absolute("./cj/1/dragoon.png"));
    this.imgPugilist = await loadImage(absolute("./cj/1/pugilist.png"));
    this.imgMonk = await loadImage(absolute("./cj/1/monk.png"));
    this.imgRogue = await loadImage(absolute("./cj/1/rogue.png"));
    this.imgNinja = await loadImage(absolute("./cj/1/ninja.png"));
    this.imgSamurai = await loadImage(absolute("./cj/1/samurai.png"));

    this.imgThaumaturge = await loadImage(absolute("./cj/1/thaumaturge.png"));
    this.imgBlackmage = await loadImage(absolute("./cj/1/blackmage.png"));
    this.imgArcanist = await loadImage(absolute("./cj/1/arcanist.png"));
    this.imgSummoner = await loadImage(absolute("./cj/1/summoner.png"));
    this.imgRedmage = await loadImage(absolute("./cj/1/redmage.png"));

    this.imgBluemage = await loadImage(absolute('./cj/1/bluemage.png'));

    this.imgJobBg = {};
    for (var i = 1; i <= 38; i++) {
      this.imgJobBg[i] = await loadImage(absolute(`./cj/bg/${i}.png`));
    }

    await this.countMountsMinions();
  }

  async countMountsMinions() {
    var response = await fetch(`https://ffxivcollect.com/api/minions/`);
    var data = await response.json();

    this.countMinion = data.count;

    var response = await fetch(`https://ffxivcollect.com/api/mounts/`);
    var data = await response.json();

    this.countMount = data.count;

    console.log(`Refreshed counts: ${this.countMinion} - ${this.countMount}`);
  }

  async createCrest(crestAry) {
    const canvas = createCanvas(128, 128);
    const ctx = canvas.getContext("2d");

    if (crestAry.length == 0)
      return null;

    for (var i = 0; i < crestAry.length; i++) {
      var crestLayer = await loadImage(crestAry[i]);
      ctx.drawImage(crestLayer, 0, 0, 128, 128);
    }

    var imgd = ctx.getImageData(0, 0, 128, 128),
      pix = imgd.data,
      newColor = { r: 0, g: 0, b: 0, a: 0 };

    for (var i = 0, n = pix.length; i < n; i += 4) {
      var r = pix[i],
        g = pix[i + 1],
        b = pix[i + 2];

      // If its white then change it
      if (r == 64 && g == 64 && b == 64) {
        // Change the white to whatever.
        pix[i] = newColor.r;
        pix[i + 1] = newColor.g;
        pix[i + 2] = newColor.b;
        pix[i + 3] = newColor.a;
      }
    }

    ctx.putImageData(imgd, 0, 0);

    return canvas;
  }

  getItemLevel(gearset) {
    var ilvl = 0;
    var cnt = 0;
    var mainHandLvl = 0;
    var hasOffHand = false;

    for (var key in gearset) {
      var piece = gearset[key];

      if (key == 'SoulCrystal')
        continue;

      if (key == 'MainHand')
        mainHandLvl = piece.Item.LevelItem;

      if (key == 'OffHand')
        hasOffHand = true;

      ilvl += piece.Item.LevelItem;
      cnt++;
    }

    if (!hasOffHand) {
      ilvl += mainHandLvl;
      cnt++;
    }

    if (cnt == 0)
      return 0;

    // ilvl division is always out of 13 items
    // mainhand counts twice if there's no offhand
    // job stones are ignored
    return this.pad(Math.floor(ilvl / 13), 4);
  }

  pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  /**
   * Creates a character card for a character.
   * @param {number | string} charaId The Lodestone ID of the character to generate a card for.
   * @param {string | Buffer | null | undefined} customImage Optional parameter providing a custom
   * image to be drawn between the background of the character card and the black information boxes.
   * The image should be the same resolution as the default image. The default image size can be
   * retrieved with {@link CardCreator#canvasSize}. May be a URL, `data: `URI, a local file path,
   * or a Buffer instance.
   * @example
   * const fs = require("fs");
   * 
   * const card = new CardCreator();
   * const lodestoneId = "13821878";
   * 
   * await card.ensureInit();
   * const png = await card.createCard(lodestoneId);
   * 
   * fs.writeFile("./test.png", png, err => {
   *   if (err) console.error(err);
   * });
   * @returns {Promise<Buffer>} A promise representating the construction of the card's image data.
   */
  async createCard(charaId, customImage) {
    const characterInfoUrl = `https://xivapi.com/character/${charaId}?extended=1&data=FC,mimo&private_key=${config.get('xivapi.token')}`;
    const response = await fetch(characterInfoUrl);
    if (!response.ok) {
      // Retry once if the request fails
      response = await fetch(characterInfoUrl);
    }

    const data = await response.json();

    const canvasSize = this.canvasSize;
    const canvas = createCanvas(canvasSize.width, canvasSize.height);
    const ctx = canvas.getContext("2d");

    const portrait = await loadImage(data.Character.Portrait);

    ctx.drawImage(this.bgImage, 0, 0, canvasSize.width, canvasSize.height + 2);

    ctx.drawImage(portrait, 0, 120, 441, 600);

    if (customImage != null) {
      const bg = await loadImage(customImage);

      ctx.drawImage(bg, 0, 0, canvasSize.width, canvasSize.height);
    }

    ctx.strokeStyle = white;
    ctx.fillStyle = black;
    ctx.beginPath();
    // Name, Title, Server Rect
    ctx.fillRect(25, 10, 840, 100);

    // BLU returns a null UnlockedState.ID so we can't use it to pick the job image.
    if (data.Character.ActiveClassJob.UnlockedState.ID != null) {
      ctx.drawImage(this.imgJobBg[data.Character.ActiveClassJob.UnlockedState.ID], 450, 4, rectFullWidth, 110);
    } else {
      ctx.drawImage(this.imgJobBg[36], 450, 4, rectFullWidth, 110);
    }

    ctx.fillRect(rectStartX, rectStartRow2Y, rectHalfWidth, rectHeightRow2);
    ctx.fillRect(rectStartXHalf, rectStartRow2Y, rectHalfWidth, rectHeightRow2);

    ctx.fillRect(rectStartX, rectStartRow3Y, rectFullWidth, rectHeightRow3); //info
    ctx.fillRect(rectStartX, rectStartRow4Y, rectFullWidth, rectHeightRow4); // bozja
    ctx.fillRect(rectStartX, rectStartRow5Y, rectFullWidth, rectHeightRow5);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.font = med;
    ctx.fillStyle = primary;

    if (data.Character.Title.Name !== undefined)
      ctx.fillText(data.Character.Title.Name, 450, 40);

    ctx.font = small;
    ctx.fillText(`${data.Character.Server} (${data.Character.DC})`, 450, 100);

    // Race, Clan, Guardian, GC, FC Titles
    ctx.font = small;
    ctx.textAlign = "left";
    ctx.fillText("Race & Clan", 480, infoTextSmallStartY);
    ctx.fillText("Guardian", 480, infoTextSmallStartY + infoTextSpacing);
    if (data.Character.GrandCompany.Company != null) {
      ctx.fillText("Grand Company", 480, infoTextSmallStartY + infoTextSpacing * 2);
    }
    if (data.Character.FreeCompanyName != null) {
      ctx.fillText("Free Company", 480, infoTextSmallStartY + infoTextSpacing * 3);
    }
    ctx.fillText("Elemental Level", 480, 425);
    ctx.fillText("Resistance Rank", 480, 475);


    ctx.fillStyle = grey;
    ctx.font = smed;

    var ilvl = this.getItemLevel(data.Character.GearSet.Gear);
    ctx.drawImage(this.imgShadow, 441 - 143, 110, 170, 90);
    ctx.drawImage(this.imgIlvl, 441 - 92, 132, 24, 27);
    ctx.fillText(ilvl, 441 - 65, 155);

    ctx.fillStyle = white;
    ctx.font = large;

    ctx.textAlign = "center";
    // Chara Name
    if (data.Character.Title === undefined || data.Character.Title.Name == null || data.Character.Title.Name == "") {
      ctx.fillText(data.Character.Name, 450, 80);
    } else {
      ctx.fillText(data.Character.Name, 450, 80);
    }
    // Race, Clan, Guardian, GC, FC Info
    ctx.font = smed;
    ctx.textAlign = "left";
    ctx.fillText(`${data.Character.Race.Name}, ${data.Character.Tribe.Name}`, 480, infoTextBigStartY);

    ctx.fillText(data.Character.GuardianDeity.Name, 480, infoTextBigStartY + infoTextSpacing);
    var deityIcon = await loadImage('https://xivapi.com/' + data.Character.GuardianDeity.Icon);
    ctx.drawImage(deityIcon, deityIconX, deityIconY, 28, 28);

    if (data.Character.GrandCompany.Company != null) {
      ctx.fillText(data.Character.GrandCompany.Company.Name, 480, infoTextBigStartY + infoTextSpacing * 2);

      var gcRankIcon = await loadImage('https://xivapi.com/' + data.Character.GrandCompany.Rank.Icon);
      ctx.drawImage(gcRankIcon, gcRankIconX, gcRankIconY, 40, 40);
    }

    if (data.Character.FreeCompanyName != null) {
      var crestImage = await this.createCrest(data.FreeCompany.Crest);

      if (crestImage !== null)
        ctx.drawImage(crestImage, fcCrestX, fcCrestY, fcCrestScale, fcCrestScale);


      const fcMeasure = ctx.measureText(data.Character.FreeCompanyName);
      ctx.fillText(data.Character.FreeCompanyName, 480, infoTextBigStartY + infoTextSpacing * 3);

      ctx.fillStyle = grey;
      ctx.font = small;
      ctx.fillText(`«${data.FreeCompany.Tag}»`, 480 + fcMeasure.width + 10, infoTextBigStartY + infoTextSpacing * 3);
    }

    ctx.font = smed;
    ctx.fillStyle = white;

    if (data.Character.ClassJobsElemental.Level != null) {
      ctx.fillText(`Level ${data.Character.ClassJobsElemental.Level}`, 480, 450);
    } else {
      ctx.fillText(`Level 0`, 480, 450);
    }

    if (data.Character.ClassJobsBozjan.Level != null) {
      ctx.fillText(`Rank ${data.Character.ClassJobsBozjan.Level}`, 480, 500);
    } else {
      ctx.fillText(`Rank 0`, 480, 500);
    }

    // Minion & Mount percentages
    var mountsPct = '0';
    if (data.Mounts !== null) {
      mountsPct = Math.ceil((data.Mounts.length / this.countMount) * 100);
    }

    var minionsPct = '0';
    if (data.Minions !== null) {
      minionsPct = Math.ceil((data.Minions.length / this.countMinion) * 100);
    }

    const mountsMeasure = ctx.measureText(`${mountsPct}%`);
    const minionsMeasure = ctx.measureText(`${minionsPct}%`);

    ctx.fillText(`${mountsPct}%`, 480, textMountMinionY);
    ctx.fillText(`${minionsPct}%`, 685, textMountMinionY);

    ctx.fillStyle = grey;
    ctx.font = small;

    ctx.fillText("Mounts", 480 + mountsMeasure.width + 5, textMountMinionY);
    ctx.fillText("Minions", 685 + minionsMeasure.width + 5, textMountMinionY);

    ctx.drawImage(this.imgMount, 620, iconMountMinionY, 32, 32);
    ctx.drawImage(this.imgMinion, 834, iconMountMinionY, 19, 32);

    ctx.fillStyle = white;


    // Why are there so many fucking jobs in this game?
    // Crafting
    ctx.textAlign = "center";

    var cJobsRowTextX = jobsRowTextStartX;
    ctx.drawImage(this.imgAlchemist, 480, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[24].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgArmorer, 510, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[20].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgBlacksmith, 540, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[19].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgCarpenter, 570, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[18].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgCulinarian, 600, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[25].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgGoldsmith, 630, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[21].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgLeatherworker, 660, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[22].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgWeaver, 690, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[23].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSpacer;

    // Gathering
    ctx.drawImage(this.imgBotanist, 750, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[27].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgFisher, 780, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[28].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgMiner, 810, jobsRowIcon3Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[26].Level, cJobsRowTextX, jobsRowText3Y);
    cJobsRowTextX += jobsRowTextSize;

    // Tanks
    cJobsRowTextX = jobsRowTextStartX;

    if (data.Character.ClassJobs[0].UnlockedState.ID == 19) {
      ctx.drawImage(this.imgPaladin, 480, jobsRowIcon1Y, 30, 30);
    } else {
      ctx.drawImage(this.imgGladiator, 480, jobsRowIcon1Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[0].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    if (data.Character.ClassJobs[1].UnlockedState.ID == 21) {
      ctx.drawImage(this.imgWarrior, 510, jobsRowIcon1Y, 30, 30);
    } else {
      ctx.drawImage(this.imgMarauder, 510, jobsRowIcon1Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[1].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgDarkKnight, 540, jobsRowIcon1Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[2].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgGunbreaker, 570, jobsRowIcon1Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[3].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSpacer;

    // Healers
    if (data.Character.ClassJobs[8].UnlockedState.ID == 24) {
      ctx.drawImage(this.imgWhitemage, 630, jobsRowIcon1Y, 30, 30);
    } else {
      ctx.drawImage(this.imgConjurer, 630, jobsRowIcon1Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[8].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgScholar, 660, jobsRowIcon1Y, 30, 30);
    if (data.Character.ClassJobs[9].Level >= 30) {
      ctx.fillText(data.Character.ClassJobs[9].Level, cJobsRowTextX, jobsRowText1Y);
    } else {
      ctx.fillText("0", cJobsRowTextX, jobsRowText1Y);
    }
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgAstrologian, 690, jobsRowIcon1Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[10].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSpacer;

    // DPS
    // Ranged
    if (data.Character.ClassJobs[11].UnlockedState.ID == 23) {
      ctx.drawImage(this.imgBard, 750, jobsRowIcon1Y, 30, 30);
    } else {
      ctx.drawImage(this.imgArcher, 750, jobsRowIcon1Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[11].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgMachinist, 780, jobsRowIcon1Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[12].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgDancer, 810, jobsRowIcon1Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[13].Level, cJobsRowTextX, jobsRowText1Y);
    cJobsRowTextX += jobsRowTextSize;

    // Melee
    cJobsRowTextX = jobsRowTextStartX;

    if (data.Character.ClassJobs[5].UnlockedState.ID == 22) {
      ctx.drawImage(this.imgDragoon, 480, jobsRowIcon2Y, 30, 30);
    } else {
      ctx.drawImage(this.imgLancer, 480, jobsRowIcon2Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[5].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSize;

    if (data.Character.ClassJobs[4].UnlockedState.ID == 20) {
      ctx.drawImage(this.imgMonk, 510, jobsRowIcon2Y, 30, 30);
    } else {
      ctx.drawImage(this.imgPugilist, 510, jobsRowIcon2Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[4].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSize;

    if (data.Character.ClassJobs[6].UnlockedState.ID == 30) {
      ctx.drawImage(this.imgNinja, 540, jobsRowIcon2Y, 30, 30);
    } else {
      ctx.drawImage(this.imgRogue, 540, jobsRowIcon2Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[6].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgSamurai, 570, jobsRowIcon2Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[7].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSpacer;

    // Caster
    if (data.Character.ClassJobs[14].UnlockedState.ID == 25) {
      ctx.drawImage(this.imgBlackmage, 630, jobsRowIcon2Y, 30, 30);
    } else {
      ctx.drawImage(this.imgThaumaturge, 630, jobsRowIcon2Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[14].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSize;

    if (data.Character.ClassJobs[15].UnlockedState.ID == 27) {
      ctx.drawImage(this.imgSummoner, 660, jobsRowIcon2Y, 30, 30);
    } else {
      ctx.drawImage(this.imgArcanist, 660, jobsRowIcon2Y, 30, 30);
    }
    ctx.fillText(data.Character.ClassJobs[15].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSize;

    ctx.drawImage(this.imgRedmage, 690, jobsRowIcon2Y, 30, 30);
    ctx.fillText(data.Character.ClassJobs[16].Level, cJobsRowTextX, jobsRowText2Y);
    cJobsRowTextX += jobsRowTextSize;

    // Limited
    ctx.drawImage(this.imgBluemage, 780, jobsRowIcon2Y, 33, 33);
    ctx.fillText(data.Character.ClassJobs[17].Level, 796, jobsRowText2Y);

    ctx.textAlign = "left";
    ctx.fillStyle = black;
    ctx.font = copyright;

    ctx.fillText(`© 2010 - ${this.copyrightYear} SQUARE ENIX CO., LTD. All Rights Reserved`, rectStartX, 720 - 5);

    return canvas.toBuffer();
  }

  async createEquipmentCard(charaId) {
    const characterInfoUrl = `https://xivapi.com/character/${charaId}?extended=1&private_key=${config.get('xivapi.token')}`;
    const response = await fetch(characterInfoUrl);
    if (!response.ok) {
      // Retry once if the request fails
      response = await fetch(characterInfoUrl);
    }

    const data = await response.json();

    const canvasSize = this.canvasSize;
    const canvas = createCanvas(canvasSize.width, canvasSize.height);
    const ctx = canvas.getContext("2d");

    const portrait = await loadImage(data.Character.Portrait);
    ctx.drawImage(this.bgImageCenter, 0, 0, canvasSize.width, canvasSize.height + 2);
    ctx.drawImage(
      portrait,
      canvasSize.width / 2 - 513 / 2,
      canvasSize.height / 2 - 700 / 2,
      513,
      700);

    // Black overlay
    ctx.strokeStyle = white;
    ctx.fillStyle = black;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw gear
    var gear = data.Character.GearSet.Gear;
    ctx.textAlign = "left";
    if (gear.MainHand) {
      var icon = await loadImage('https://xivapi.com/' + gear.MainHand.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.MainHand.Item.LevelItem, equipLeftTextStartX, equipIlvlY);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.MainHand.Item.Name, equipLeftTextStartX, equipItemNameY);
      if (gear.MainHand.Mirage)
        ctx.fillText(gear.MainHand.Mirage.Name, equipLeftTextStartX, equpMirageNameY);
    }

    if (gear.Head) {
      var icon = await loadImage('https://xivapi.com/' + gear.Head.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY + equipSpacing, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Head.Item.LevelItem, equipLeftTextStartX, equipIlvlY + equipSpacing);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Head.Item.Name, equipLeftTextStartX, equipItemNameY + equipSpacing);
      if (gear.Head.Mirage)
        ctx.fillText(gear.Head.Mirage.Name, equipLeftTextStartX, equpMirageNameY + equipSpacing);
    }

    if (gear.Body) {
      var icon = await loadImage('https://xivapi.com/' + gear.Body.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY + equipSpacing * 2, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Body.Item.LevelItem, equipLeftTextStartX, equipIlvlY + equipSpacing * 2);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Body.Item.Name, equipLeftTextStartX, equipItemNameY + equipSpacing * 2);
      if (gear.Body.Mirage)
        ctx.fillText(gear.Body.Mirage.Name, equipLeftTextStartX, equpMirageNameY + equipSpacing * 2);
    }

    if (gear.Hands) {
      var icon = await loadImage('https://xivapi.com/' + gear.Hands.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY + equipSpacing * 3, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Hands.Item.LevelItem, equipLeftTextStartX, equipIlvlY + equipSpacing * 3);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Hands.Item.Name, equipLeftTextStartX, equipItemNameY + equipSpacing * 3);
      if (gear.Hands.Mirage)
        ctx.fillText(gear.Hands.Mirage.Name, equipLeftTextStartX, equpMirageNameY + equipSpacing * 3);
    }

    if (gear.Waist) {
      var icon = await loadImage('https://xivapi.com/' + gear.Waist.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY + equipSpacing * 4, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Waist.Item.LevelItem, equipLeftTextStartX, equipIlvlY + equipSpacing * 4);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Waist.Item.Name, equipLeftTextStartX, equipItemNameY + equipSpacing * 4);
      if (gear.Waist.Mirage)
        ctx.fillText(gear.Waist.Mirage.Name, equipLeftTextStartX, equpMirageNameY + equipSpacing * 4);
    }

    if (gear.Legs) {
      var icon = await loadImage('https://xivapi.com/' + gear.Legs.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY + equipSpacing * 5, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Legs.Item.LevelItem, equipLeftTextStartX, equipIlvlY + equipSpacing * 5);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Legs.Item.Name, equipLeftTextStartX, equipItemNameY + equipSpacing * 5);
      if (gear.Legs.Mirage)
        ctx.fillText(gear.Legs.Mirage.Name, equipLeftTextStartX, equpMirageNameY + equipSpacing * 5);
    }

    if (gear.Feet) {
      var icon = await loadImage('https://xivapi.com/' + gear.Feet.Item.Icon);
      ctx.drawImage(icon, equipLeftImageStartX, equipY + equipSpacing * 6, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Feet.Item.LevelItem, equipLeftTextStartX, equipIlvlY + equipSpacing * 6);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Feet.Item.Name, equipLeftTextStartX, equipItemNameY + equipSpacing * 6);
      if (gear.Feet.Mirage)
        ctx.fillText(gear.Feet.Mirage.Name, equipLeftTextStartX, equpMirageNameY + equipSpacing * 6);
    }

    ctx.textAlign = "right";
    if (gear.OffHand) {
      var icon = await loadImage('https://xivapi.com/' + gear.OffHand.Item.Icon);
      ctx.drawImage(icon, equipRightImageStartX, equipY, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.OffHand.Item.LevelItem, equipRightTextStartX, equipIlvlY);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.OffHand.Item.Name, equipRightTextStartX, equipItemNameY);
      if (gear.OffHand.Mirage)
        ctx.fillText(gear.OffHand.Mirage.Name, equipRightTextStartX, equpMirageNameY);
    }

    if (gear.Earrings) {
      var icon = await loadImage('https://xivapi.com/' + gear.Earrings.Item.Icon);
      ctx.drawImage(icon, equipRightImageStartX, equipY + equipSpacing, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Earrings.Item.LevelItem, equipRightTextStartX, equipIlvlY + equipSpacing);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Earrings.Item.Name, equipRightTextStartX, equipItemNameY + equipSpacing);
      if (gear.Earrings.Mirage)
        ctx.fillText(gear.Earrings.Mirage.Name, equipRightTextStartX, equpMirageNameY + equipSpacing);
    }

    if (gear.Necklace) {
      var icon = await loadImage('https://xivapi.com/' + gear.Necklace.Item.Icon);
      ctx.drawImage(icon, equipRightImageStartX, equipY + equipSpacing * 2, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Necklace.Item.LevelItem, equipRightTextStartX, equipIlvlY + equipSpacing * 2);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Necklace.Item.Name, equipRightTextStartX, equipItemNameY + equipSpacing * 2);
      if (gear.Necklace.Mirage)
        ctx.fillText(gear.Necklace.Mirage.Name, equipRightTextStartX, equpMirageNameY + equipSpacing * 2);
    }

    if (gear.Bracelets) {
      var icon = await loadImage('https://xivapi.com/' + gear.Bracelets.Item.Icon);
      ctx.drawImage(icon, equipRightImageStartX, equipY + equipSpacing * 3, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Bracelets.Item.LevelItem, equipRightTextStartX, equipIlvlY + equipSpacing * 3);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Bracelets.Item.Name, equipRightTextStartX, equipItemNameY + equipSpacing * 3);
      if (gear.Bracelets.Mirage)
        ctx.fillText(gear.Bracelets.Mirage.Name, equipRightTextStartX, equpMirageNameY + equipSpacing * 3);
    }

    if (gear.Ring1) {
      var icon = await loadImage('https://xivapi.com/' + gear.Ring1.Item.Icon);
      ctx.drawImage(icon, equipRightImageStartX, equipY + equipSpacing * 4, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Ring1.Item.LevelItem, equipRightTextStartX, equipIlvlY + equipSpacing * 4);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Ring1.Item.Name, equipRightTextStartX, equipItemNameY + equipSpacing * 4);
      if (gear.Ring1.Mirage)
        ctx.fillText(gear.Ring1.Mirage.Name, equipRightTextStartX, equpMirageNameY + equipSpacing * 4);
    }

    if (gear.Ring2) {
      var icon = await loadImage('https://xivapi.com/' + gear.Ring2.Item.Icon);
      ctx.drawImage(icon, equipRightImageStartX, equipY + equipSpacing * 5, equipImgSize, equipImgSize);

      ctx.font = smed;
      ctx.fillStyle = primary;
      ctx.fillText(gear.Ring2.Item.LevelItem, equipRightTextStartX, equipIlvlY + equipSpacing * 5);

      ctx.font = small;
      ctx.fillStyle = white;
      ctx.fillText(gear.Ring2.Item.Name, equipRightTextStartX, equipItemNameY + equipSpacing * 5);
      if (gear.Ring2.Mirage)
        ctx.fillText(gear.Ring2.Mirage.Name, equipRightTextStartX, equpMirageNameY + equipSpacing * 5);
    }


    ctx.strokeStyle = white;
    ctx.fillStyle = black;
    ctx.beginPath();
    ctx.fillRect(0, canvasSize.height - 120, canvasSize.width, 120);

    ctx.textAlign = "center";
    ctx.font = med;
    ctx.fillStyle = primary;

    ctx.fillText(data.Character.Name, 450, canvasSize.height - 70);

    ctx.font = small;
    ctx.fillText(`${data.Character.Server} (${data.Character.DC})`, 450, canvasSize.height - 50);

    var ilvl = this.getItemLevel(data.Character.GearSet.Gear);
    ctx.drawImage(this.imgShadow, 415, canvasSize.height - 49, 170, 90);
    ctx.drawImage(this.imgIlvl, 415, canvasSize.height - 49, 24, 27);
    ctx.fillText(ilvl, 460, canvasSize.height - 30);

    return canvas.toBuffer();
  }
}

exports.CardCreator = CardCreator;
