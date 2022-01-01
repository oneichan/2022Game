phina.define('AnimateButton', {
    superClass: 'Button',

    init: function(options) {
      options = (options || {}).$safe(AnimateButton.defaults);
      this.superInit(options);

      this.fontFamily = 'chihaya';
      
      // 独自プロパティ
      var scaleMin = options.scaleMin;
      var sound = options.sound;

      this.on('pointstart',function(){
        SoundManager.play(sound);
      });

      // プッシュ時の処理を追加
      this.on('pointstay', function() {
        // 少し縮小
        this.setScale(scaleMin, scaleMin);
      });
      this.on('pointend', function() {
        // 元に戻す
        this.setScale(1.0, 1.0);
      });
    },
    
    _static: {
      defaults: {
        scaleMin: 0.95,
        sound: 'se_ok',
        stroke: 'black',
        strokeWidth: 20,
        fill: 'white',
        fontSize:80,
        fontColor: 'black',
        width: 350,
        height:130,

      },
    },
  });

// phina.define('NotoLabel', {
//   superClass: 'Label',
//   init: function (options) {
//     options = (options || {}).$safe(NotoLabel.defaults);
//     this.superInit(options);
//     this.fontSize = 40;
//     this.fontFamily = 'chihaya';
//   },
   
//   _static: {
//     defaults: {
      
//     },
//   },  
// });