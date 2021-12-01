export default function handleAddressInput(address, setAddress) {
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;

  setAddress({ ...address, rua, numero });
}
