class Structure {
    
    constructor() {
        this.imageAmount = -1;
        this.inputData = [];
        this.images = [];
        this.interestMatrix = null;
    }

    addLine(line) {
        if (this.imageAmount === -1) {
            this.imageAmount = parseInt(line);
            return;
        }
        const parts = line.split(' ');
        const horz = parts.shift() === 'H';
        parts.shift();
        const image = new Image(this.images.length, horz, parts);
        this.inputData.push(line);
        this.images.push(image);
    }

    sortImages() {
        this.images.sort((a, b) => b.tags.length - a.tags.length);
    }

    readStdIn(callback) {
        let buff = "";
        let lines = [];
        process.stdin
            .on('data', data => {
                buff += data;
                lines = buff.split(/[\r\n|\n]/);
                buff = lines.pop();
                lines.forEach(line => this.addLine(line));
            })
            .on('end', () => {
                if (buff.length > 0) this.addLine(buff);
                //this.sortImages();
                callback();
            });
    }
}

class Image {
    constructor(index, horz, tags) {
        this.index = index;
        this.horz = horz;
        this.tags = tags;
    }
}

module.exports = Structure;