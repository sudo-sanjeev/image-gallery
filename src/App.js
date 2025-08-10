import React from "react";
import { ImageCarousel } from "./ImageCarousel";
import "./styles.css";

const imageUrls = [
  "https://farm3.staticflickr.com/2220/1572613671_7311098b76_z_d.jpg",
  "https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg",
  "https://farm2.staticflickr.com/1090/4595137268_0e3f2b9aa7_z_d.jpg",
  "https://farm4.staticflickr.com/3224/3081748027_0ee3d59fea_z_d.jpg",
  "https://farm9.staticflickr.com/8295/8007075227_dc958c1fe6_z_d.jpg",
  "https://farm2.staticflickr.com/1449/24800673529_64272a66ec_z_d.jpg",
  "https://farm4.staticflickr.com/3752/9684880330_9b4698f7cb_z_d.jpg",
];

const testEmpty = [];

export default function App() {
  return (
    <div className="App">
      <h1>Image Carousel</h1>
      <ImageCarousel imageUrls={imageUrls} />
    </div>
  );
}
