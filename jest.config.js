module.exports = {
    moduleNameMapper: {
        '^components(.*)': '<rootDir>/src/components/$1',
        '^contexts(.*)': '<rootDir>/src/contexts/$1',
        '^reducers(.*)': '<rootDir>/src/reducers/$1',
        '^graphqlquery(.*)': '<rootDir>/src/graphqlquery/$1',
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif|svg)$": "identity-obj-proxy"
    }
};

