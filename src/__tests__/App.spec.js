import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { ImageCarousel } from "../components/ImageCarousel";

const loadImageMock = jest.fn();

beforeAll(() => {
  globalThis.Image = jest.fn(() => ({
    _src: "",
    _isInit: false,
    set src(new_src) {
      if (!this._isInit || this._src !== new_src) {
        this._isInit = true;
        loadImageMock(new_src);
      }
      return (this._src = new_src);
    },
    get src() {
      return this._src;
    },
    onload: jest.fn(),
    onerror: jest.fn(),
  }));
});

const mockUrls = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];

describe("ImageCarousel", () => {
  beforeEach(() => {
    loadImageMock.mockClear();
  });

  it("renders without crashing with empty list and renders first image by default", () => {
    const { getByText } = render(<ImageCarousel imageUrls={[]} />);
    expect(getByText(/No images available/i)).toBeInTheDocument();

    const { getByRole } = render(<ImageCarousel imageUrls={mockUrls} />);
    const img = getByRole("img");
    expect(img).toHaveAttribute("src", mockUrls[0]);
  });

  it("navigates to correct image on navigation button clicks", () => {
    const { getByText, getByRole } = render(
      <ImageCarousel imageUrls={mockUrls} />
    );
    const img = getByRole("img");
    fireEvent.click(getByText(/Next/i));
    expect(img).toHaveAttribute("src", mockUrls[1]);
    fireEvent.click(getByText(/Next/i));
    expect(img).toHaveAttribute("src", mockUrls[2]);
    fireEvent.click(getByText(/Next/i));
    expect(img).toHaveAttribute("src", mockUrls[0]);
    fireEvent.click(getByText(/Previous/i));
    expect(img).toHaveAttribute("src", mockUrls[2]);
    fireEvent.click(getByText(/Previous/i));
    expect(img).toHaveAttribute("src", mockUrls[1]);
    fireEvent.click(getByText(/Previous/i));
    expect(img).toHaveAttribute("src", mockUrls[0]);
  });

  it("auto-advances after 3 seconds", async () => {
    render(<ImageCarousel imageUrls={mockUrls} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockUrls[0]);

    await waitFor(
      () => expect(screen.getByRole("img")).toHaveAttribute("src", mockUrls[1]),
      { timeout: 5000 }
    );
  });

  it("preloads the correct images on initial render and on navigation", async () => {
    loadImageMock.mockClear();
    render(<ImageCarousel imageUrls={mockUrls} />);

    await waitFor(() => expect(loadImageMock).toHaveBeenCalledTimes(2), {
      timeout: 1000,
    });
    expect(loadImageMock).toHaveBeenCalledWith(mockUrls[1]);
    expect(loadImageMock).toHaveBeenCalledWith(mockUrls[2]);

    loadImageMock.mockClear();

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => expect(loadImageMock).toHaveBeenCalledTimes(2), {
      timeout: 1000,
    });
    expect(loadImageMock).toHaveBeenCalledWith(mockUrls[2]);
    expect(loadImageMock).toHaveBeenCalledWith(mockUrls[0]);
  });
});
