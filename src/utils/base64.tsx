export function encodeToBase64(data: any) {
  return btoa(
    encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

export function decodeFromBase64(encodedData: any) {
  if (!encodedData) return "";
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(encodedData), (c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
