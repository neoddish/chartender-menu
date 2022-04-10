import html2canvas from "html2canvas";

import { CHART_CONTAINER_ID } from "../constants";

/**
 * Download from page document.
 *
 * @param data - string data
 * @param filename - file name to export
 */
function download(data: string, filename: string): void {
  const tempLink = document.createElement("a");
  let href: string = data;
  tempLink.style.display = "none";
  tempLink.href = href;
  tempLink.setAttribute("download", filename);

  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

/**
 * Export string data as a file.
 *
 * @param data - string data
 * @param filename - file name to export (with ext.)
 */
export async function exportFile(data: string, filename: string) {
  const textData = "data:text/plain;charset=utf-8, " + encodeURIComponent(data);
  download(textData, filename);
}

/**
 * Export PNG image.
 */
async function exportPng(selector: string, filename: string) {
  const dom = document.querySelector(selector);
  if (dom) {
    const canvas = await html2canvas(dom as HTMLElement);
    download(canvas.toDataURL(), `${filename}.png`);
  }
}

//TODO export svg
async function exportSvg(selector: string, filename: string) {}

type ImageFormat = "PNG" | "SVG";

/**
 * Export image.
 *
 * @param selector - DOM selector string
 * @param filename - file name to export (without ext.)
 * @param format - image format
 */
export async function exportImg(
  selector: string,
  filename: string,
  format: ImageFormat
): Promise<void> {
  switch (format) {
    case "PNG":
      await exportPng(selector, filename);
      break;

    default:
      break;
  }
}

/**
 * Export image for chart view.
 */
export async function exportChartImg(filename: string, format: ImageFormat) {
  await exportImg(`#${CHART_CONTAINER_ID}`, filename, format);
}
