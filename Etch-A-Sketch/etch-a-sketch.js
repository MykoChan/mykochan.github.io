const container = document.querySelector(".grid-container");
const pencilButton = document.querySelector("#pencil");
const eraserButton = document.querySelector("#eraser");
const fillButton = document.querySelector("#fill-bucket");
const clearButton = document.querySelector("#clear");
const colorPicker = document.querySelector("#color-picker");
const canvasSizeText = document.querySelector("#canvas-size");
const canvasSizeSlider = document.querySelector("#canvas-size-slider");
const colorPalette = document.querySelector("#color-palette");

// Default values
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "pencil";
const DEFAULT_SIZE = 32;

let color = DEFAULT_COLOR;
let oldColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let canvasSize = DEFAULT_SIZE;
let mousedown = false;
let canvas = [];

document.body.onmousedown = () => {
    mousedown = true;
};
document.body.onmouseup = () => {
    mousedown = false;
};

function _fill(pixel) {
    pixel.style.backgroundColor = color;
    const row = pixel.getAttribute("data-row");
    const column = pixel.getAttribute("data-column");

    const topPixel = document.querySelector(
        `.pixel[data-row='${+row - 1}'][data-column='${+column}']`
    );
    const bottomPixel = document.querySelector(
        `.pixel[data-row='${+row + 1}'][data-column='${+column}']`
    );
    const leftPixel = document.querySelector(
        `.pixel[data-row='${+row}'][data-column='${+column - 1}']`
    );
    const rightPixel = document.querySelector(
        `.pixel[data-row='${+row}'][data-column='${+column + 1}']`
    );

    if (+row - 1 >= 0 && topPixel.style.backgroundColor === oldColor) {
        _fill(topPixel);
    }
    if (+column - 1 >= 0 && leftPixel.style.backgroundColor === oldColor) {
        _fill(leftPixel);
    }
    if (
        +row + 1 < canvasSize &&
        bottomPixel.style.backgroundColor === oldColor
    ) {
        _fill(bottomPixel);
    }
    if (
        +column + 1 < canvasSize &&
        rightPixel.style.backgroundColor === oldColor
    ) {
        _fill(rightPixel);
    }
}

function draw(e) {
    if (e.type === "mouseover" && !mousedown) return;
    if (currentMode === "pencil") {
        e.target.style.backgroundColor = color;
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "#FFFFFF";
    } else if (currentMode === "fill-bucket") {
        oldColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = color;
        _fill(e.target);
    }
}

function setupGrid(size) {
    canvas = new Array(size).fill(new Array(size).fill("#FFFFFF"));
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement("div");
        const row = Math.floor(i / size);
        const column = i % size;
        pixel.classList.add("pixel");
        pixel.setAttribute("data-row", row);
        pixel.setAttribute("data-column", column);

        pixel.style.backgroundColor = canvas[row][column];
        pixel.addEventListener("mousedown", draw);
        pixel.addEventListener("mouseover", draw);
        container.appendChild(pixel);
    }
}

function setCurrentColor(e) {
    const rgb2hex = (rgb) =>
        `#${rgb
            .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
            .slice(1)
            .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
            .join("")}`;
    if (e.target === colorPicker) {
        color = e.target.value;
    } else if (e.target.classList.contains("color-tile")) {
        color = e.target.style.backgroundColor;
        colorPicker.value = rgb2hex(color);
    }
}

function setCurrentMode(button) {
    pencilButton.classList.remove("button-selected");
    eraserButton.classList.remove("button-selected");
    fillButton.classList.remove("button-selected");
    button.target.classList.add("button-selected");
    currentMode = button.target.id;
}

function clearCanvas() {
    container.innerHTML = "";
    setupGrid(canvasSize);
}

function updateCanvasSizeText(e) {
    canvasSizeText.innerText = `${e.target.value} x ${e.target.value}`;
}

function updateCanvasSize(e) {
    canvasSize = parseInt(e.target.value);
    updateCanvasSizeText(e);
    clearCanvas();
}

function setupColorPalette() {
    const colorList = [
        "#000000",
        "#434343",
        "#666666",
        "#999999",
        "#b7b7b7",
        "#cccccc",
        "#d9d9d9",
        "#efefef",
        "#f3f3f3",
        "#ffffff",
        "#980000",
        "#ff0000",
        "#ff9900",
        "#ffff00",
        "#00ff00",
        "#00ffff",
        "#4a86e8",
        "#0000ff",
        "#9900ff",
        "#ff00ff",
        "#e6b8af",
        "#f4cccc",
        "#fce5cd",
        "#fff2cc",
        "#d9ead3",
        "#d0e0e3",
        "#c9daf8",
        "#cfe2f3",
        "#d9d2e9",
        "#ead1dc",
        "#dd7e6b",
        "#ea9999",
        "#f9cb9c",
        "#ffe599",
        "#b6d7a8",
        "#a2c4c9",
        "#a4c2f4",
        "#9fc5e8",
        "#b4a7d6",
        "#d5a6bd",
        "#cc4125",
        "#e06666",
        "#f6b26b",
        "#ffd966",
        "#93c47d",
        "#76a5af",
        "#6d9eeb",
        "#6fa8dc",
        "#8e7cc3",
        "#c27ba0",
        "#a61c00",
        "#cc0000",
        "#e69138",
        "#f1c232",
        "#6aa84f",
        "#45818e",
        "#3c78d8",
        "#3d85c6",
        "#674ea7",
        "#a64d79",
        "#85200c",
        "#990000",
        "#b45f06",
        "#bf9000",
        "#38761d",
        "#134f5c",
        "#1155cc",
        "#0b5394",
        "#351c75",
        "#741b47",
        "#5b0f00",
        "#660000",
        "#783f04",
        "#7f6000",
        "#274e13",
        "#0c343d",
        "#1c4587",
        "#073763",
        "#20124d",
        "#4c1130",
    ];
    for (let i = 0; i < colorList.length; i++) {
        const colorTile = document.createElement("div");
        colorTile.classList.add("color-tile");
        colorTile.style.backgroundColor = colorList[i];
        colorTile.addEventListener("click", setCurrentColor);
        colorPalette.appendChild(colorTile);
    }
}

window.onload = () => {
    pencilButton.classList.add("button-selected");
    canvasSizeText.innerText = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;
    canvasSizeSlider.value = DEFAULT_SIZE;
    setupGrid(DEFAULT_SIZE);
    setupColorPalette();
};

// Event listeners
colorPicker.addEventListener("input", setCurrentColor);
pencilButton.addEventListener("click", setCurrentMode);
eraserButton.addEventListener("click", setCurrentMode);
clearButton.addEventListener("click", clearCanvas);
fillButton.addEventListener("click", setCurrentMode);
canvasSizeSlider.addEventListener("mousemove", updateCanvasSizeText);
canvasSizeSlider.addEventListener("click", updateCanvasSize);
