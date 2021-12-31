phina.define('TitleScene',{
    superClass: 'DisplayScene',
    init: function(params){
        this.superInit(params);
        this.backgroundColor = 'floralwhite';

        var self = this;

        // グローバル変数初期化
        // g_Questions = JSON.parse(JSON.stringify(QUIZ_DATA.Questions));
        // g_Questions.shuffle();
        // g_AllQuizCount = g_Questions.length;
        // g_CorrectQuizCount = 0;
        // g_CurrentQuizCount = 0;
        g_TurnCount = 0;
        g_Score = 0;

        var titleLabel = Label({
            text:'2022',
            fontFamily:'chihaya',
            fontSize:200,
        });
        titleLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(3));
        
        var descriptionLabel = NotoLabel({
            fontSize: 50,
        });
        descriptionLabel.text = 'とらトラップ！\n〜寅がでたらおわり〜';
        descriptionLabel.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(8));
        
        var startButton = AnimateButton({
            text:'はじめる',
            fill:'white',
            stroke:'black',
            fontColor:'black',

        });
        startButton.addChildTo(this)
        .setPosition(this.gridX.center(),this.gridY.span(13));
        startButton.onpush = function(){
            self.exit({
                cardCount:INIT_CARDCOUNT,
            })
        ;};
        
    }
});