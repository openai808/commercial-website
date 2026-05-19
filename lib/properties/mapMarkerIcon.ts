const LISTING_MARKER_PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

const DEFAULT_MARKER_COLOR = "#000759";
const HIGHLIGHT_MARKER_COLOR = "#E53935";

export function getListingMarkerIcon(
  highlighted: boolean,
): google.maps.Symbol {
  return {
    path: LISTING_MARKER_PIN_PATH,
    fillColor: highlighted ? HIGHLIGHT_MARKER_COLOR : DEFAULT_MARKER_COLOR,
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: highlighted ? 2.5 : 1.5,
    scale: highlighted ? 1.45 : 1.15,
    anchor: new google.maps.Point(12, 24),
  };
}
