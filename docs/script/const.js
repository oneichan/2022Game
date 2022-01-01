phina.globalize();

const ASSETS = {
    font: {
        fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff',
        chihaya: './font/ちはや毛筆-free-.ttf',
        noto: './font/NotoSerifJP-Regular.otf',
        aoyagi: './font/AoyagiKouzanTOTF.otf'
    },
    image: {
        'tora': './img/animalface_tora.png',
    },
    sound: {
        'se_ok': './sound/maoudamashi_sys_38.mp3',
        'se_dodon': './sound/koukaonLabo_wadaikododon.mp3',
        'se_faceup': './sound/koukaonLabo_jidaigekiensyutu1.mp3',
        'se_tora': './sound/koukaonLabo_jidaigekiensyutu1.mp3',
        'se_result': './sound/maoudamashi_sys_jingle10.mp3',
        'se_scoreN':'./sound/koukaonLabo_hyosigi1.mp3',
        'se_scoreL':'./sound/koukaonLabo_hyosigi2.mp3',
        'bgm_main': './sound/maoudamashi_event_09.mp3',
    }
};

const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 640;
const INIT_CARDCOUNT = 5;
const TORA_NUMBER = 1;
const MIN_CARDCOUNT = 2;
const MAX_CARDCOUNT = 5;
const CARD_SIZE_X = 150;
const CARD_SIZE_Y = 230;
const CARD_COLUMN_Y = 1;
const CARD_OFFSET = 0;
const CARD_FACEUP_TIME = 3000;//ミリ秒
const DEFAULT_SCORE = 10;
const SCORE_BASE = 6;//スコア計算時のベース
const SCORE_BASE_LUCKEY = 7;//スコア計算時のベース
const SCORE_CHAIN_BONUS_TURNCOUNT = 10;
const EXITCHANCE_TURN = 1;

