import config from '../config.js'

export default class FileConteiner{
    constructor(file_endpoint){
        this.url=`${config.fileSystem.baseUrl}${file_endpoint}`
    }
}