function toWareki(year) {
    year = parseInt(year);
    if (year >= 2019) return `令和${year - 2018}年`;
    if (year >= 1989) return `平成${year - 1988}年`;
    if (year >= 1926) return `昭和${year - 1925}年`;
    if (year >= 1912) return `大正${year - 1911}年`;
    if (year >= 1868) return `明治${year - 1867}年`;
    return '対応外の年です';
  }
  
  function toSeirekiFromDropdown() {
    const era = document.getElementById('era').value;
    const year = parseInt(document.getElementById('eraYear').value);
    const eraMap = {
      '明治': 1867,
      '大正': 1911,
      '昭和': 1925,
      '平成': 1988,
      '令和': 2018
    };
    return `${eraMap[era] + year}年`;
  }
  
  function updateInputUI(mode) {
    const container = document.getElementById('input-container');
    container.innerHTML = '';
  
    if (mode === 'toSeireki') {
      const eras = ['明治', '大正', '昭和', '平成', '令和'];
      const eraSelect = document.createElement('select');
      eraSelect.id = 'era';
  
      eras.forEach(era => {
        const opt = document.createElement('option');
        opt.value = era;
        opt.textContent = era;
        eraSelect.appendChild(opt);
      });
  
      const yearInput = document.createElement('input');
      yearInput.type = 'number';
      yearInput.id = 'eraYear';
      yearInput.placeholder = '年を入力（例: 6）';
      yearInput.min = 1;
      yearInput.addEventListener('input', handleInput);
      eraSelect.addEventListener('change', handleInput);
  
      container.appendChild(eraSelect);
      container.appendChild(yearInput);
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'input';
      input.placeholder = '例: 2024';
      input.addEventListener('input', handleInput);
      container.appendChild(input);
    }
  }
  
  function handleInput() {
    const mode = document.getElementById('mode').value;
    const resultEl = document.getElementById('result');
    let result = '';
  
    if (mode === 'toWareki') {
      const value = document.getElementById('input').value.trim();
      result = toWareki(value);
    } else {
      const eraYearEl = document.getElementById('eraYear');
      if (eraYearEl && eraYearEl.value) {
        result = toSeirekiFromDropdown();
      } else {
        result = '';
      }
    }
  
    resultEl.textContent = result;
  }
  
  document.getElementById('mode').addEventListener('change', (e) => {
    updateInputUI(e.target.value);
    handleInput();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    updateInputUI(document.getElementById('mode').value);
  });