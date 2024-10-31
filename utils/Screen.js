
export class Screen{
    constructor(canvasSelector) {
        this.canvas = document.querySelector(canvasSelector);;
        this.ctx = this.canvas.getContext("2d");

        const parent = this.canvas.parentElement;

        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    drawImage(image,x,y){
        this.ctx.drawImage(image, x, y);
    }

    drawCanvas(image,x,y){
        image.onload = () => {
            this.ctx.drawImage(image, x, y, this.canvas.width, this.canvas.height);
        };
    }
}