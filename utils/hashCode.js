function hashCode(value, length = 8) {
  if(value === undefined) value = Math.random() * (100 - 1) + 1;

  const str = JSON.stringify(value);
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  let id = Math.abs(hash).toString(16);
  
  return id.padStart(length, Math.random() * (100 - 1) + 1);
}
