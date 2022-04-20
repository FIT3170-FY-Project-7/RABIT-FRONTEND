module.exports = {
    env           : { browser: true, es2021: true },
    extends       : [
        'esnext',
        'airbnb',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    settings      : { 'import/resolver': { node: { moduleDirectory: ['node_modules', 'src/'] } } },
    parser        : ['@typescript-eslint/parser', '@babel/eslint-parser'],
    parserOptions : {
        ecmaFeatures : { experimentalObjectRestSpread: true, impliedStrict: true },
        sourceType   : 'module'
    },
    plugins       : ['react', 'react-hooks', '@typescript-eslint', '@babel'],
    rules         : {
        'no-param-reassign'                  : 2,
        'import/order'                       : [
            2,
            {
                'newlines-between' : 'always',
                groups             : ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type']
            }
        ],
        'no-console'                         : 0,
        'prefer-destructuring'               : 0,
        'no-shadow'                          : 0,
        'no-unused-vars'                     : [2, { ignoreRestSiblings: false }],
        'no-extra-parens'                    : 2,
        '@typescript-eslint/no-extra-parens' : 2,
        'no-return-assign'                   : [2, 'except-parens'],
        'key-spacing'                        : [
            2,
            {
                align : {
                    beforeColon : true,
                    afterColon  : true,
                    on          : 'colon'
                }
            }
        ],

        'react/jsx-filename-extension'       : 0,
        'react/prop-types'                   : 2,
        'react/require-default-props'        : 0,
        'react/no-array-index-key'           : 0,
        'react/jsx-props-no-spreading'       : 0,
        'react/jsx-wrap-multilines'          : false,
        'react/forbid-prop-types'            : 0,

        'jsx-a11y/anchor-is-valid'           : 0,

        'no-restricted-imports'              : [2, { patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'] }]
    }
}
