module.exports = plop => {
    plop.setGenerator('model', {
        description: 'Create a model',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your model name?'
            },
        ],
        actions: [
            {
                type: 'add',
                path: './src/models/{{dashCase name}}.model.ts',
                templateFile: './plop-templates/model.ts.hbs'
            },
        ]
    });

    plop.setGenerator('controller', {
        description: 'Create a controller',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your controller name?'
            },
        ],
        actions: [
            {
                type: 'add',
                path: './src/controllers/{{dashCase name}}.controller.ts',
                templateFile: './plop-templates/controller.hbs'
            },
        ]
    });
}