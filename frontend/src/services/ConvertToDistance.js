function convertToDistance(lat, lng, poslat, poslng) {
  const radiusEarthkm = 6371.07103;
  const radlat = lat * (Math.PI / 180);
  const radPositionLat = poslat * (Math.PI / 180);
  const radlatDiff = (lat - poslat) * (Math.PI / 180);
  const radlngDiff = (lng - poslng) * (Math.PI / 180);
  const distance =
    2 *
    radiusEarthkm *
    Math.sin(
      Math.sqrt(
        Math.sin(radlatDiff / 2) * Math.sin(radlatDiff / 2) +
          Math.cos(radPositionLat) *
            Math.cos(radlat) *
            Math.sin(radlngDiff / 2) *
            Math.sin(radlngDiff / 2)
      )
    );
  return distance.toFixed(2);
}
export default convertToDistance;
