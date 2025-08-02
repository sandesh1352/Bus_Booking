module.exports = {
    assets:['./src/assets/fonts/'], // font path
    getTransformModulePath(){ // typescript transformer
        return require.resolve('react-native-typescript-transformer');
    },
    getSourceExts(){
        return ['ts','tsx']
    },
};