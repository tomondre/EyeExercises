var ghpages = require('gh-pages');

let AnalgyphExerciseSettings = {
    dest: 'Analgyph',
    branch: 'gh-pages'
};
ghpages.publish('AnalgyphExercise', AnalgyphExerciseSettings, () => {
    console.log("Analgyph deployed")
}).then(() => {
    let FootballGameSettings = {
        dest: 'Football',
        branch: 'gh-pages'
    };
    ghpages.publish('FootballGame/dist', FootballGameSettings, () => {
        console.log("Football deployed")
    }).then(() => {
        let JumpingColumnSettings = {
            dest: 'JumpingColumn',
            branch: 'gh-pages'
        };
        ghpages.publish('JumpingColumn/dist', JumpingColumnSettings, () => {
            console.log("JumpingColumn deployed")
        }).then(() => {
            let MazeSettings = {
                dest: 'Maze',
                branch: 'gh-pages'
            };
            ghpages.publish('Maze/dist', MazeSettings, () => {
                console.log("Maze deployed")
            }).then(() => {
                let SmoothPursuitSettings = {
                    dest: 'SmoothPursuit',
                    branch: 'gh-pages'
                };
                ghpages.publish('SmoothPursuit/dist', SmoothPursuitSettings, () => {
                    console.log("SmoothPursuit deployed")
                }).then(() => console.log("Great Success!"));
            });
        });
    });
});