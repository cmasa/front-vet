
export const formatDateTime = (isoString) => {
  const fecha = new Date(isoString);
  const dia = fecha.toLocaleDateString();
  const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${dia} - ${hora}`;
};
