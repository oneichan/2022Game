phina.main(function () {
  var app = GameApp({
    startLabel: 'title',
    assets: ASSETS,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scenes: [
      {
        className: 'TitleScene',
        label: 'title',
        nextLabel: 'main',
      },
      {
        className: 'MainScene',
        label: 'main',
        nextLabel: 'result',
      },
      {
        className: 'ResultScene',
        label: 'result',
        nextLabel: 'title',
      },
      {
        className: 'CreditScene',
        label: 'credit',
        nextLabel: 'title'
      },
    ],
  });
  app.run();
});
