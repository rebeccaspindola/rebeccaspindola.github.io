function onSubmit() {
  //assign variables.
  var minCol = Number(document.getElementById('xFirst').value);
  var maxCol = Number(document.getElementById('xEnd').value);
  var minRow = Number(document.getElementById('yFirst').value);
  var maxRow = Number(document.getElementById('yLast').value);


  if(document.getElementById('xFirst').value == '' || document.getElementById('xEnd').value == ''
    || document.getElementById('yFirst').value == '' || document.getElementById('yLast').value == '') {
    minCol = 1;
    maxCol = 10;
    minRow = 1;
    maxRow = 10
  }

  var startX = minCol;
  var startY = minRow;

  var x;
  //Create Table. used https://stackoverflow.com/questions/54523630/multiplication-table-using-appendchild-and-html-table as a source
  var table = document.createElement('table');
  table.classList.add('newTable');

  //Start table loop. First for loop is for rows. Second is for columns
  for (let i = 0; i <= getXBounds(minRow,maxRow); i++){
    const row = document.createElement('tr'); // Create first Row

    startX = minCol; //set X to starting value since we are creating a new column

    for (let j = 0; j <= getYBounds(minCol,maxCol); j++){

      const col = document.createElement('td'); // Create first column

      if ((i == 0) && (j == 0))  { // first square in table is empty
        val = ''
        col.classList.add('firstCell');

      } else if(i == 0) {  // First row
        val = startX;
        startX++;
        col.classList.add('firstRow');

      } else if(j == 0) { // New Column
        val = startY;
        col.classList.add('firstCol');
      }

      else { //Multiply
        val = startX * startY
        startX++;
      }
      col.innerHTML = val;
      row.appendChild(col);

    }

    if(i != 0) { //after first case
      startY++;
    }

    table.appendChild(row);
  }

  document.getElementById('myTable').innerHTML = '';
  document.getElementById('myTable').appendChild(table);

  return false;
}

//Next two functions gets the size of i and j in order to build table.
function getXBounds(xMin, xLast) {
  return Math.abs(xLast - xMin) + 1;
}

function getYBounds(yMin, yLast) {
  return Math.abs(yLast - yMin) + 1;
}
