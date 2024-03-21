function appendToDisplay(value) {
    document.getElementById('display').value += value;
  }

  function clearDisplay() {
    document.getElementById('display').value = '';
  }

  function calculateResult() {
    try {
      document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (error) {
      document.getElementById('display').value = 'Error';
    }
  }


  document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9+\-*/]/.test(key)) {
      event.preventDefault();
      appendToDisplay(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      calculateResult();
    } else if (key === 'Escape') {
      clearDisplay();
    } else if (key === 'Backspace') {
      event.preventDefault();
      const currentInput = document.getElementById('display').value;
      document.getElementById('display').value = currentInput.slice(0, -1);
    }
  });