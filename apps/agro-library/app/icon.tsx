import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#17241d",
        color: "#fff9f2",
        display: "flex",
        fontFamily: "Georgia, serif",
        fontSize: 20,
        height: "100%",
        justifyContent: "center",
        width: "100%"
      }}
    >
      A
    </div>,
    size
  );
}
