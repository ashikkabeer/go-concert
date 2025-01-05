module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base', // or any other style guide you prefer
        'prettier', // Make sure this is last to override conflicting rules
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
        // Add any other custom rules here
    },
};
