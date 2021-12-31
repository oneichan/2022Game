phina.define('ResultScene',{
    superClass: 'DisplayScene',
    init:function(param){
        this.superInit(param);
        this.backgroundColor = 'floralwhite';

        var self = this;

        var titleLabel = Label({
            text:'あけおめ🐯',
            fontFamily:'chihaya',
            fontSize:120,
        });
        titleLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(5));
        
        var descriptionLabel = NotoLabel({
            fontSize: 50,
        });
        descriptionLabel.text = "音楽：魔王魂　様";
        descriptionLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(9));
        
        var startButton = AnimateButton({
            text:'たいとる',
            fill:'white',
            stroke:'black',
            fontColor:'black',

        });
        startButton.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(13));
        startButton.onpush = function(){self.exit();};
        
    }
});