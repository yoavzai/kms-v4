export const cleanPayload = (payloadWithTypeName) => {
  const cleaned = JSON.parse(
    JSON.stringify(payloadWithTypeName, (name, val) => {
      if (name === "__typename") {
        delete val[name];
      } else {
        return val;
      }
    })
  );
  return cleaned;
};
