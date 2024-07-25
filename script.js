// On loading the page .. User will be directed to the Entring point which is Entring his equtions and variables count
window.onload = generateBeggining;

// this function will be loaded for only 1 time at the beggining of the paged load
function generateBeggining() {
  generateName();
  //   generateEntringPoint();
}

// this function creates the h1 of the page
function generateName() {
  let all = document.createElement('div');
  all.setAttribute('id', 'all');
  document.body.prepend(all);

  let h1 = document.createElement('h1');
  h1.append('Solving Linear System');
  h1.classList.add('font-effect-fire-animation');
  document.body.prepend(h1);
}

function generateEntringPoint() {
  // Creating a big div which holds all sub-divs in the entring point
  let entryEquationsDiv = document.createElement('div');
  entryEquationsDiv.setAttribute('id', 'entryEquationsDiv');

  // Creating a div that holds variables, equations label and Input field  and create submit div that holds our button
  let variablesDiv = document.createElement('div');
  variablesDiv.setAttribute('id', 'variablesDiv');

  let equationsDiv = document.createElement('div');
  equationsDiv.setAttribute('id', 'equationsDiv');

  let submitDiv = document.createElement('div');
  submitDiv.setAttribute('id', 'submitDiv');

  // Creating the equations and variable labels and relating them to thier input fields
  let variablesLabel = document.createElement('label');
  variablesLabel.append('Enter Number of variables: ');
  variablesLabel.setAttribute('id', 'varaiblesSpan');
  variablesLabel.setAttribute('for', 'varaiblesInput');

  let equationsLabel = document.createElement('label');
  equationsLabel.append('Enter Number of equations: ');
  equationsLabel.setAttribute('id', 'equationsSpan');
  equationsLabel.setAttribute('for', 'equationsInput');

  // Creating the equations and variable Inputs
  let variablesInput = document.createElement('input');
  variablesInput.setAttribute('id', 'varaiblesInput');
  variablesInput.setAttribute('type', 'text');

  let equationsInput = document.createElement('input');
  equationsInput.setAttribute('id', 'equationsInput');
  equationsInput.setAttribute('type', 'text');

  // on changing inputs value Inputs are going to be resized
  variablesInput.oninput = inputResize;
  equationsInput.oninput = inputResize;

  // Creating the submit button that will direct us to ask user about his/her values
  let submit = document.createElement('input');
  submit.setAttribute('id', 'submit');
  submit.setAttribute('type', 'submit');

  // Appending variables, equations labels and inputs into thier divs
  variablesDiv.appendChild(variablesLabel);
  variablesDiv.appendChild(variablesInput);

  equationsDiv.appendChild(equationsLabel);
  equationsDiv.appendChild(equationsInput);

  submitDiv.appendChild(submit);

  // Appending variables, equations divs and submit button into the main div
  entryEquationsDiv.appendChild(variablesDiv);
  entryEquationsDiv.appendChild(equationsDiv);
  entryEquationsDiv.appendChild(submitDiv);

  // Appending the main div into our Page
  let all = document.getElementById('all');
  all.appendChild(entryEquationsDiv);

  // On pressing the submit button .. we will check if our values are proper or not by going to the submitChecker function
  submit.addEventListener(
    'click',
    submitChecker.bind(this, variablesInput, equationsInput),
    false,
  );
}

function submitChecker(variablesInput, equationsInput) {
  // A checker that is going to match input values (They must be positive integers with no fractions and it must be digits only)
  let inputsREGEX = /^0*[1-9]+0*$/;
  let variablesInputValue = variablesInput.value;
  let equationsInputValue = equationsInput.value;

  // if our inputs match that regular expression we will move to the next step which is getting user matrix values by executing GettingUserValues function
  if (
    inputsREGEX.test(variablesInputValue) == true &&
    inputsREGEX.test(equationsInputValue) == true
  ) {
    GettingUserValues(Number(variablesInputValue), Number(equationsInputValue));
    deleteEntryPoint();
  }
}

function GettingUserValues(variablesCount, equationsCount) {
  // generate Variable Array by moving to this function
  let variablesArray = generateVariablesArray(variablesCount);

  // creating the main div of User value inputs
  let UserAllDiv = document.createElement('div');
  UserAllDiv.setAttribute('id', 'UserAllDiv');

  // UserAllEquationsInputsArray => Array of All inputs created (length = Number of equations * Number of variables+1)
  let UserAllEquationsInputsArray = [];

  for (let i = 0; i < equationsCount; i++) {
    // Creating an equation div
    let equationDiv = document.createElement('div');
    equationDiv.setAttribute('id', `equation${i + 1}`);

    // UserEquationPsArray => Array of all <P> inside the one equation (p consists of label and input field)
    // UserEquationInputs => Array of all <input> inside the one equation
    let UserEquationPsArray = [];
    let UserEquationInputs = [];

    for (let j = 0; j < Number(variablesCount) + 1; j++) {
      // Creating an input inside the equation
      UserEquationInputs[j] = document.createElement('input');
      UserEquationInputs[j].setAttribute('type', 'text');
      UserEquationInputs[j].setAttribute(
        'id',
        `UserEquationInputs${i + 1}${j + 1}`,
      );

      // Creating the Symbol label
      let equationSymbolLabel = document.createElement('label');
      equationSymbolLabel.setAttribute('id', 'equationSymbolLabel');
      equationSymbolLabel.setAttribute(
        'for',
        `UserEquationInputs${i + 1}${j + 2}`,
      );

      // Creating the variable label
      let variableLabel = document.createElement('label');
      variableLabel.setAttribute('id', 'variableLabel');
      variableLabel.setAttribute('for', `UserEquationInputs${i + 1}${j + 1}`);

      // if we haven't reached the last value (which isn't a variable value)
      if (j != variablesCount) {
        // UserEquationSpan => Creates a span that will holds an input with its variable and symbol labels
        let UserEquationSpan = document.createElement('span');
        UserEquationSpan.setAttribute('id', `UserEquationSpan${i + 1}${j + 1}`);

        // Creating the text node of the proper variable and appending it into its label
        let variableText = document.createTextNode(`${variablesArray[j]}`);
        variableLabel.appendChild(variableText);

        // if we are at the end of the equation put = sign else? put + sign
        if (j == variablesCount - 1) equationSymbolLabel.append('=');
        else equationSymbolLabel.append('+');

        // Appending variable and symbol labels into the span that holds variable name and the proper symbol
        UserEquationSpan.appendChild(variableLabel);
        UserEquationSpan.appendChild(equationSymbolLabel);

        // Creating <p> element that holds the previous span in addition to the <input>
        UserEquationP = document.createElement('p');
        UserEquationP.setAttribute('id', `p${i + 1}${j + 1}`);
        UserEquationP.classList.add('UserEquationP');
        UserEquationP.appendChild(UserEquationInputs[j]);
        UserEquationP.appendChild(UserEquationSpan);
      }

      // if we have reached the last value (which isn't a variable value)
      else {
        // Creating <p> element that holds our input directly as we don't need now the sign or the variable name
        UserEquationP = document.createElement('p');
        UserEquationP.setAttribute('id', `p${i + 1}${j + 1}`);
        UserEquationP.classList.add('UserEquationP');
        UserEquationP.appendChild(UserEquationInputs[j]);
      }

      // At the end .. whether it was the last element or not append the <p> into Ps array and append it into our equation div
      equationDiv.append(UserEquationP);
      UserEquationPsArray.push(UserEquationP);
    }

    // After finishing the eqaution .. Add it into our big div that holds our equations, add our equation inputs into our all inputs array,
    UserAllEquationsInputsArray.push(UserEquationInputs);
    UserAllDiv.append(equationDiv);
  }

  // on changing inputs value Inputs are going to be resized
  for (let i = 0; i < UserAllEquationsInputsArray.length; i++)
    for (let j = 0; j < UserAllEquationsInputsArray[0].length; j++)
      UserAllEquationsInputsArray[i][j].oninput = inputResize;

  // After finishing looping on all equations append the big main div into our page
  let all = document.getElementById('all');
  all.appendChild(UserAllDiv);

  // Creating gauss, gauss jordon buttons
  let gauss = document.createElement('input');
  gauss.setAttribute('id', 'gauss');
  gauss.setAttribute('type', 'submit');
  gauss.setAttribute('value', 'gauss solution');
  gauss.addEventListener(
    'click',
    valuesChecker.bind(
      this,
      UserAllEquationsInputsArray,
      'gauss',
      variablesArray,
    ),
    false,
  );

  let gaussJordon = document.createElement('input');
  gaussJordon.setAttribute('id', 'gaussJordon');
  gaussJordon.setAttribute('type', 'submit');
  gaussJordon.setAttribute('value', 'gaussJordon solution');
  gaussJordon.addEventListener(
    'click',
    valuesChecker.bind(
      this,
      UserAllEquationsInputsArray,
      'gaussJordon',
      variablesArray,
    ),
    false,
  );

  let inverse = document.createElement('input');
  inverse.setAttribute('id', 'inverse');
  inverse.setAttribute('type', 'submit');
  inverse.setAttribute('value', 'inverse solution');
  inverse.addEventListener(
    'click',
    valuesChecker.bind(
      this,
      UserAllEquationsInputsArray,
      'inverse',
      variablesArray,
    ),
    false,
  );

  // Creating a div that contains gauss, gaussJordon buttons
  let solutionsWaysDiv = document.createElement('div');
  solutionsWaysDiv.setAttribute('id', 'solutionsWaysDiv');
  solutionsWaysDiv.appendChild(gauss);
  solutionsWaysDiv.appendChild(gaussJordon);
  solutionsWaysDiv.appendChild(inverse);

  // Appending solutions div into our main big div
  UserAllDiv.appendChild(solutionsWaysDiv);

  // Appending the main big div into our page
  all.append(UserAllDiv);
}

function valuesChecker(
  UserAllEquationsInputsArray,
  solutionWay,
  variablesArray,
) {
  // Sets a regular expression that checks if the entered value is a number or not with initial value of true expression
  let inputsREGEX = /\d+$/;
  let checker = true;

  // Loops over all of entered values and see if they all match the regex or not
  outerLoop: for (let i = 0; i < UserAllEquationsInputsArray.length; i++) {
    for (let j = 0; j < UserAllEquationsInputsArray[0].length; j++) {
      if (inputsREGEX.test(UserAllEquationsInputsArray[i][j].value) == false) {
        checker = false;
        break outerLoop;
      }
    }
  }

  if (checker == true) {
    generateMatrices(UserAllEquationsInputsArray, solutionWay, variablesArray);
    deleteUserEquations();
  }
}

function generateVariablesArray(variablesCount) {
  // generate a variable Array that holds the name of our created variables and setting initial values of them to ""
  let variablesArray = [];
  let variablesArrayValues = [];

  for (let i = 0; i < variablesCount; i++) {
    variablesArray[i] = `x${i + 1}`;
    variablesArrayValues[i] = '';
  }

  return variablesArray;
}

function generateMatrices(
  UserAllEquationsInputsArray,
  solutionWay,
  variablesArray,
) {
  // step => is a counter that is going to get how many steps we have done
  // exception is determining if the matrix has solutions or has no solutions or have infinite solutions
  let step = 1;
  let matrix = [];
  let matrixTranspose = [];
  let exception;

  // Creating a main big div that is going to store each matrix in each step we are doing
  let allMatricesDiv = document.createElement('div');
  allMatricesDiv.setAttribute('id', 'allMatricesDiv');

  // Appending Matrices Div to our body
  let all = document.getElementById('all');
  all.appendChild(allMatricesDiv);

  // Getting our origin matrix and its transpose
  matrix = generateOriginMatrix(UserAllEquationsInputsArray, solutionWay);
  if (matrix[0] == 'No Solutions')
    return generateTextDiv('origin', '', 'No Solutions', [], []);
  else if (matrix[0] == 'infinite')
    return generateTextDiv('origin', '', 'infinite', [], []);
  else matrixTranspose = generateMatrixTranspose(matrix);

  if (
    solutionWay == 'inverse' &&
    matrixTranspose.length / 2 != matrixTranspose[0].length
  ) {
    let textDiv = generateTextDiv(matrix, solutionWay, 'No inverse', [], []);
    resetToEntryPoint(textDiv);
    return;
  }

  outerLoop: for (let i = 0; i < matrixTranspose.length; i++) {
    if (i == matrixTranspose[0].length) {
      let variablesFinalValues = gettingVariablesFinalValues(matrix);
      if (variablesFinalValues == 'no') {
        if (solutionWay == 'inverse') {
          let textDiv = generateTextDiv(
            matrix,
            solutionWay,
            'in',
            variablesArray,
            variablesFinalValues,
          );
          resetToEntryPoint(textDiv);
          break outerLoop;
        } else {
          let textDiv = generateTextDiv(
            matrix,
            solutionWay,
            'No Solutions',
            variablesArray,
            variablesFinalValues,
          );
          resetToEntryPoint(textDiv);
          break outerLoop;
        }
      } else {
        let textDiv = generateTextDiv(
          matrix,
          solutionWay,
          exception,
          variablesArray,
          variablesFinalValues,
        );
        resetToEntryPoint(textDiv);
        break outerLoop;
      }
    }

    // Setting the leading one number as we will need it in setting other rows
    // if we are using gaussJordon elemination so we will treat with the values above the diagonal of the matrix to set them to zero
    let leading = 0;
    let aboveDiagonal = [];

    for (let j = 0; j < matrixTranspose[0].length; j++) {
      // if we are using gaussJordon elemination so we will treat with the values above the diagonal of the matrix to set them to zero
      if (
        (solutionWay == 'gaussJordon' || solutionWay == 'inverse') &&
        i != matrixTranspose.length - 1
      )
        if (i > j) aboveDiagonal.push(matrixTranspose[i][j]);

      // Go to process your matrix with "multiplier"
      if (i == j)
        [leading, matrix, step] = generateProcessedMatrix(
          matrix,
          matrixTranspose,
          aboveDiagonal,
          step,
          'multiplier',
          i,
          j,
          leading,
          solutionWay,
        );
      // Go to process your matrix with "adder"
      else if (i < j)
        [leading, matrix, step] = generateProcessedMatrix(
          matrix,
          matrixTranspose,
          aboveDiagonal,
          step,
          'adder',
          i,
          j,
          leading,
          solutionWay,
        );

      // (General Case) Apply changes to our transposed array
      matrixTranspose = generateMatrixTranspose(matrix);

      // Check if we returns with an infinite value or the matrix has no solutions
      if (
        leading == 'infinite' ||
        leading == 'No Solutions' ||
        leading == 'zero'
      ) {
        if (solutionWay == 'inverse') leading = 'No inverse';
        // Setting the exception with the value of the returned value as we will need it outside the loop
        exception = leading;

        // Creating our exception div with infinite or no solutions
        let textDiv = generateTextDiv(
          matrix,
          solutionWay,
          leading,
          variablesArray,
          [],
        );
        resetToEntryPoint(textDiv);

        // getting out from the loop as there's no meaning of looping again!
        break outerLoop;
      }
    }

    if (
      (solutionWay == 'gaussJordon' || solutionWay == 'inverse') &&
      i != matrixTranspose.length - 1
    ) {
      // looping over upper diagonal values
      for (let j = 0; j < aboveDiagonal.length; j++) {
        // Go to process your matrix with "adder"
        [leading, matrix, step] = generateProcessedMatrix(
          matrix,
          matrixTranspose,
          aboveDiagonal,
          step,
          'gaussJordonAdder',
          i,
          j,
          leading,
          solutionWay,
        );

        // Apply changes to our transposed array
        matrixTranspose = generateMatrixTranspose(matrix);

        if (
          leading == 'infinite' ||
          leading == 'No Solutions' ||
          leading == 'zero'
        ) {
          // Setting the exception with the value of the returned value as we will need it outside the loop
          exception = leading;

          // Creating our exception div with infinite or no solutions
          let textDiv = generateTextDiv(
            matrix,
            solutionWay,
            leading,
            variablesArray,
            [],
          );
          resetToEntryPoint(textDiv);

          // getting out from the loop as there's no meaning of looping again!
          break outerLoop;
        }
      }
    }
  }
}

function generateOriginMatrix(UserAllEquationsInputsArray, solutionWay) {
  // Creating our matrix with default empty intializer
  let matrix = [];
  if (
    UserAllEquationsInputsArray.length !=
      UserAllEquationsInputsArray[0].length &&
    solutionWay == 'inverse'
  ) {
    let textDiv = generateTextDiv([], '', 'nosquare', [], []);
    resetToEntryPoint(textDiv);
    return null;
  }
  let duplicator = UserAllEquationsInputsArray.length;
  for (let i = 0; i < UserAllEquationsInputsArray.length; i++) {
    // initializing our row with no values so it will be refilled each time we passed a row
    let row = [];
    for (let j = 0; j < UserAllEquationsInputsArray[0].length; j++) {
      row[j] = Number(UserAllEquationsInputsArray[i][j].value);
    }

    if (solutionWay == 'inverse') {
      for (let j = 0; j < duplicator; j++) {
        if (i == j) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
    }

    matrix.push(row);
  }

  return printingProcessedArray(matrix, 0, 'creating', 0, 0, 0, 0, 1, 0);
}

function generateMatrixTranspose(matrix) {
  // Creating our matrixTranspose with default empty intializer
  let matrixTranspose = [];

  for (let i = 0; i < matrix[0].length; i++) {
    // initializing our row with no values so it will be refilled each time we passed a row
    let row = [];
    for (let j = 0; j < matrix.length; j++) {
      row[j] = matrix[j][i];
    }
    matrixTranspose.push(row);
  }

  return matrixTranspose;
}

function generateProcessedMatrix(
  matrix,
  matrixTranspose,
  aboveDiagonal,
  step,
  process,
  i,
  j,
  leading,
  solutionWay,
) {
  // Setting default values of processing variables
  let adder = 0;
  let multiplier = 1;
  let multiplierSlot = '';
  let replace = -1;

  // If we are on the adders stage
  if (process.toString().toLowerCase().includes('adder') == true) {
    // if the value is already 0 (won't be changed)
    if (matrixTranspose[i][j] == 0) process = 'adder0';
    else {
      // if we are on the above diagonal elements using gaussJordon
      if (process == 'gaussJordonAdder') adder = -1 * aboveDiagonal[j];
      // if we are on the below diagonal elements
      else adder = -1 * matrixTranspose[i][j];

      // in both cases do this equation
      for (let u = 0; u < matrix[0].length; u++)
        matrix[j][u] = matrix[j][u] + adder * matrix[leading][u];
    }
  }

  // If we are on the multipliers stage
  else if (process.toString().toLowerCase().includes('multiplier') == true) {
    // if the value of our leading one is 0 (big problem)
    if (matrixTranspose[i][i] == 0) {
      // if we are at the end of the matrix -> there's no way to come back again so it's exceptional
      if (i == matrix[0].length - 1) {
        exception = infiniteAndNoSolutionsChecker(matrix, i);
        if (exception == null) exception = 'No Solutions';
        return [exception, exception, exception];
      }

      // else .. we set a counter to find the first non-zero element to replace its row with the current row
      let v = j;
      replace = j;
      // While we haven't exceeded our matrix
      while (v != matrix.length - 1) {
        v++;
        // if we finally have found a non-zero element we will mark its place then break the loop
        if (matrix[v][i] != 0) {
          replace = v;
          break;
        }
      }

      // if the value of replace has been updated that means that we found a non-zero element
      if (replace != j) {
        // a temp array is used to swap two rows together at the same time
        let temp = [];
        for (let t = 0; t < matrix[0].length; t++) {
          temp[t] = matrix[replace][t];
          matrix[replace][t] = matrix[j][t];
          matrix[j][t] = temp[t];
        }

        // Setting the process to swap
        process = 'swapping';
      }

      // if the value of replace hasn't been updated that means that we haven't found a non-zero element so it's an exception
      else {
        for (let v = 0; v < matrix.length; v++) {
          if (matrix[v][i] != 0) {
            exception = infiniteAndNoSolutionsChecker(matrix, j);
            if (exception == null) exception = 'No Solutions';
            return [exception, exception, exception];
          }
        }
        return ['zero', 'zero', 'zero'];
      }
    }

    // if our leading one is already 1 (we won't make changes)
    else if (matrixTranspose[i][i] == 1) process = 'multiplier1';
    // it our leading one isn't 0 or 1 we will make our changes to it
    else {
      // Setting a multipler that will be used to update its row value
      // and a multiplier slot which will be as a description for us of what have we done
      multiplier = 1 / matrixTranspose[i][i];
      multiplierSlot =
        multiplier > 0
          ? `1/${matrixTranspose[i][i]}`
          : `(-1)/${-matrixTranspose[i][i]}`;

      // Changing leading one row values
      for (let u = 0; u < matrix[0].length; u++)
        matrix[j][u] = matrix[j][u] * multiplier;
    }
  }

  // Updating our matrix transpose values
  matrixTranspose = generateMatrixTranspose(matrix);

  // Printing the process of our matrix and returning some values of it
  return printingProcessedArray(
    matrix,
    step,
    process,
    i,
    j,
    leading,
    adder,
    multiplier,
    multiplierSlot,
    replace,
    solutionWay,
  );
}

function printingProcessedArray(
  matrix,
  step,
  process,
  i,
  j,
  leading,
  adder,
  multiplier,
  multiplierSlot,
  replace,
  solutionWay,
) {
  // Creating the matrix div
  let matrixDiv = document.createElement('div');
  matrixDiv.setAttribute('id', ++step);
  matrixDiv.setAttribute('class', 'matrixDiv');

  // Creating the All rows div
  let rowsDiv = document.createElement('div');
  rowsDiv.setAttribute('class', 'rows');

  // Creating left, right arrows of the matrix
  let leftArrow = document.createElement('div');
  leftArrow.setAttribute('class', 'arrow left');

  let rightArrow = document.createElement('div');
  rightArrow.setAttribute('class', 'arrow right');

  rowsDiv.appendChild(leftArrow);
  rowsDiv.appendChild(rightArrow);

  // printing the loop after the updated changes
  for (let a = 0; a < matrix.length; a++) {
    // Creating each row of the matrix
    let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', `row${a + 1}`);

    // setting the active column
    activeColumn = a;

    for (let b = 0; b < matrix[0].length; b++) {
      // Setting the active row
      activeRow = b;

      // Creating a span for each value of the matrix
      let span = document.createElement('span');
      span.append(matrix[a][b]);
      rowDiv.appendChild(span);

      if (
        a == leading &&
        (process == 'adder' || process == 'gaussJordonAdder')
      ) {
        span.classList.add('activeAdder');
      }

      if (replace > 0 && process == 'swapping') {
        if (a == replace) {
          span.classList.add('activeAdder');
        }
      }

      if (
        a == j &&
        process != 'creating' &&
        process != 'adder0' &&
        process != 'multiplier1'
      ) {
        span.classList.add('activeRow');
      }

      if (b == i && process != 'creating') {
        span.classList.add('activeColumn');
      }

      // if we are on the element that isn't diagonal which achieve the selected one
      if (
        process == 'multiplier' ||
        process == 'multiplier1' ||
        process == 'swapping'
          ? a == b && b == j
          : a == j && b == i
      ) {
        // Creating the description of our step depending on the current process
        description = document.createElement('p');

        // if we are on the adder phase
        if (process == 'adder' || process == 'gaussJordonAdder') {
          description.append(
            `In C${i + 1} => R${j + 1} = R${j + 1} + (${
              adder < 0 ? `(${adder})` : adder
            } * R${leading + 1})`,
          );
          span.classList.add('currentAdder');
        }

        // if we are adding nothing (adder = 0)
        else if (process == 'adder0') {
          description.append(
            `In R${j + 1} C${
              i + 1
            } Our non-leading one value is already 0 so we won't change it`,
          );
          span.classList.add('currentAdder');
        }

        // if we are multiplying
        else if (process == 'multiplier') {
          description.append(
            `In C${i + 1} => R${a + 1} = R${a + 1} * ${multiplierSlot}`,
          );
          leading = j;
          span.classList.add('activeMultiplier');
        }

        // if we are multiplying no thing (multiplier = 1)
        else if (process == 'multiplier1') {
          description.append(
            `In R${j + 1} C${
              i + 1
            } Our leading one is already 1 so we won't change it`,
          );
          leading = j;
          span.classList.add('activeMultiplier');
        }

        // if we are swapping elements
        else if (process == 'swapping') {
          description.append(
            `In C${i + 1} => Swapping R${j + 1} with R${replace + 1}`,
          );
          leading = j;
        }

        // if we are creating the matrix for the first time
        else if (process == 'creating') {
          description.append(
            `Creating an augmanted matrix of entered equations`,
          );
          rowsDiv.classList.add('activeMatrix');
        }

        // Adding description to tell us what have we done
        description.classList.add('description');
        matrixDiv.appendChild(description);
      }
    }

    // Appending each row in rows Div
    rowsDiv.appendChild(rowDiv);
  }

  // Appending rows to matrix, matrix to matrixDiv
  matrixDiv.prepend(rowsDiv);
  allMatricesDiv.appendChild(matrixDiv);

  // Set an exception to check if we are on an infinite, no solutions statement or nerither of them
  let exception = infiniteAndNoSolutionsChecker(matrix, j);
  if (exception != null) return [exception, exception, exception];

  // if we have swept to rows we have to process the matrix again as the leading one maybe not equal 1 .. as we swept rows only
  if (process == 'swapping') {
    // update transpose values and process again
    matrixTranspose = generateMatrixTranspose(matrix);
    generateProcessedMatrix(
      matrix,
      matrixTranspose,
      [],
      step++,
      'multiplier',
      i,
      j,
      leading,
      solutionWay,
    );
  }

  // If we are still creating our matrix we will return the matrix only
  if (process == 'creating') return matrix;

  // return leading to use it in adder steps, step to tell us how many processes have we made, matrix to update it
  let returnedValues = [leading, matrix, step];
  return returnedValues;
}

function infiniteAndNoSolutionsChecker(matrix, j) {
  // Setting initial valueof our zero counter to be 0 that is going to count how many zeros are there and begin to compare them with matrix row length
  let zeros = 0;

  for (let o = 0; o < matrix[0].length; o++) {
    if (matrix[j][o] == 0) zeros += 1;
    // if the nonzero value is at the end of the row don't increase our zero variable
    else if (o == matrix[0].length - 1) zeros += 0;
    // if we have a nonzero value (not at the end of the row) then it can't be infinite or has no solutions so we set our counter to 0 again
    else break;
  }

  // if we have number of zeros equal the length of matrix row then it's infinite
  if (zeros == matrix[0].length) return 'infinite';
  // if we have number of zeros equal the length of matrix row - 1  (All values except the last one) then it has no solutions
  else if (zeros == matrix[0].length - 1) return 'No Solutions';
  // Neither this nor that .. it has solutions
  else return null;
}

function gettingVariablesFinalValues(matrix) {
  let variablesArrayValues = [];

  // looping over equations starting from the end (because if it's gauss we need to get variable values descending)
  for (let i = matrix.length - 1; i >= 0; i--) {
    // looping over equation values from the end (because if it's gauss we need to get variable values descending)
    for (let j = matrix[0].length - 2; j >= 0; j--) {
      // if we are on the value where i = j
      if (i == j) {
        // if we aren't on the end of the matrix row
        if (i != matrix.length - 1) {
          let result = 0;
          let o = j;
          // while the row hasn't reached its the end value
          while (o < matrix[0].length - 2) {
            o++;
            result += matrix[i][o] * variablesArrayValues[o];
          }
          variablesArrayValues[i] = matrix[i][matrix[0].length - 1] - result;
        } else {
          variablesArrayValues[i] = matrix[i][matrix[0].length - 1];
        }
        if (isNaN(variablesArrayValues[i])) return 'no';
      }
    }
  }

  return variablesArrayValues;
}

function generateTextDiv(
  matrix,
  solutionWay,
  exception,
  variablesArray,
  variablesArrayValues,
) {
  // Creating a div that is holding our all text
  let textDiv = document.createElement('div');
  textDiv.setAttribute('id', 'textDiv');

  // Appending it to our page
  let all = document.getElementById('all');
  all.appendChild(textDiv);

  // if we are using gauss elemination we have to type our equations first
  if (solutionWay == 'gauss' && exception == undefined) {
    // Creating the big main div that holds our equation values
    let finalEquationsMainDiv = document.createElement('div');
    finalEquationsMainDiv.setAttribute('id', 'finalEquationsMainDiv');

    // Creating the equation text
    let pTextp = document.createElement('p');
    pTextp.append('From the processed matrix we found that');

    // Appending the main equations div to our origin div
    finalEquationsMainDiv.appendChild(pTextp);
    textDiv.append(finalEquationsMainDiv);

    // Creating the inner div that is accepting our equations <p>
    let finalEquationsinnerDiv = document.createElement('div');
    finalEquationsinnerDiv.setAttribute('id', 'finalEquationsinnerDiv');

    let finalTextP;

    // iterating over our matrix to get eqautions
    for (let i = 0; i < matrix.length; i++) {
      // our equation <p>
      finalTextP = document.createElement('p');

      for (let j = 0; j < matrix[0].length - 1; j++) {
        // if the operand = 0 skip it
        if (matrix[i][j] == 0) continue;
        else {
          // Creating <span> for each operator, operand and variable
          let operatorSpan = document.createElement('span');
          let operandSpan = document.createElement('span');
          let variableSpan = document.createElement('span');

          operatorSpan.setAttribute('class', 'operator');
          operandSpan.setAttribute('class', 'operand');
          variableSpan.setAttribute('class', 'variable');

          // if we have reached the end of our equation we set the operator to = else set it to +
          // if the operand is 1 don't type it .. if it's -1 type it as -
          operatorSpan.append(j == matrix[0].length - 2 ? '=' : '+');
          operandSpan.append(
            matrix[i][j] == 1 ? '' : matrix[i][j] == -1 ? '-' : matrix[i][j],
          );
          variableSpan.append(variablesArray[j]);

          // Appending our spans to the equation <p>
          finalTextP.appendChild(operandSpan);
          finalTextP.appendChild(variableSpan);
          finalTextP.appendChild(operatorSpan);
        }
      }

      if (finalTextP.lastElementChild.innerHTML == '+')
        finalTextP.lastElementChild.innerHTML = '=';

      // Creating a span that holds the value at the end of the matrix
      let valueSpan = document.createElement('span');
      valueSpan.setAttribute('class', 'value');
      valueSpan.append(matrix[i][matrix[0].length - 1]);

      // Appending this value to our eqaution <p>, Appending <p> equation into our innerDiv equations
      finalTextP.appendChild(valueSpan);
      finalEquationsinnerDiv.appendChild(finalTextP);
    }

    // Appending the innerDiv eqautions into our big equations div
    finalEquationsMainDiv.appendChild(finalEquationsinnerDiv);
  }

  // Creating div that holds our final values
  let finalValuesMaindiv = document.createElement('div');
  finalValuesMaindiv.setAttribute('id', 'finalValuesMaindiv');

  // Creating the innerDiv containing values
  let finalValuesInnerDiv = document.createElement('div');
  finalValuesInnerDiv.setAttribute('id', 'finalValuesInnerDiv');

  // Creating the head text of our variables values div
  let textValuesP = document.createElement('p');
  if (exception == 'infinite')
    textValuesP.append('The System has Infinite Solutions!');
  else if (exception == 'No Solutions')
    textValuesP.append('The System has no solutions!');
  else if (exception == 'No inverse')
    textValuesP.append('The Matrix has no inverse!');
  else if (exception == 'nosquare')
    textValuesP.append("The Matrix has no inverse! It's not a Squared matrix!");
  else if (exception == 'in')
    textValuesP.append(
      `The Matrix inverse is the right side ${matrix.length}x${matrix.length} matrix`,
    );
  else if (exception == 'zero')
    textValuesP.append('Enter a non zero column and then try again');
  else {
    // If we are using gauss jordon elemination
    if (solutionWay == 'gaussJordon')
      textValuesP.append('From the processed matrix we found that');
    // If we are using gauss elemination
    else if (solutionWay == 'gauss')
      textValuesP.append('From the past equations we got variables value');
  }

  // Appending header into our innerDiv, Appending innerDiv into our mainDiv, Appending mainDiv into origin one
  finalValuesMaindiv.appendChild(textValuesP);
  finalValuesMaindiv.appendChild(finalValuesInnerDiv);
  textDiv.appendChild(finalValuesMaindiv);

  // If there's a solution
  if (exception == undefined) {
    for (let i = 0; i < variablesArrayValues.length; i++) {
      // Creating <span> for each variable, operator, value
      let variableSpan = document.createElement('span');
      let operatorSpan = document.createElement('span');
      let valueSpan = document.createElement('span');

      // Setting classes to the spans
      variableSpan.setAttribute('class', 'variable');
      operatorSpan.setAttribute('class', 'operator');
      valueSpan.setAttribute('class', 'value');

      // Appending the values in thier spans
      variableSpan.append(variablesArray[i]);
      operatorSpan.append('=');
      valueSpan.append(variablesArrayValues[i]);

      // Creating our assignment
      let assignment = document.createElement('p');
      assignment.appendChild(variableSpan);
      assignment.appendChild(operatorSpan);
      assignment.appendChild(valueSpan);

      // Appending assignment into our div
      finalValuesInnerDiv.append(assignment);
    }
  }

  if (matrix == 'origin') resetToEntryPoint(textDiv);
  else return textDiv;
}

function resetToEntryPoint(textDiv) {
  // Creating restart Div
  let restartDiv = document.createElement('div');
  restartDiv.setAttribute('id', 'restartDiv');

  // Creating restart button
  let restart = document.createElement('input');
  restart.setAttribute('id', 'restart');
  restart.setAttribute('type', 'submit');
  restart.setAttribute('value', 'Solve another one');

  // Appending restart button to its div and appending the div into
  restartDiv.appendChild(restart);
  textDiv.appendChild(restartDiv);

  // if we clicked on that button we will go back to the entry point
  restart.onclick = function () {
    generateEntringPoint();
    deleteMatrices();
    deleteTextDiv();
  };
}

// Deleteing user entereing values
function deleteUserEquations() {
  UserAllDiv.remove();
}

// Deleting the entry point of selecting number of equations and variables
function deleteEntryPoint() {
  let entryEquationsDiv = document.getElementById('entryEquationsDiv');
  entryEquationsDiv.remove();
}

// Deleteing all proceesses matrices
function deleteMatrices() {
  let all = document.getElementById('allMatricesDiv');
  all.remove();
}

// Deleting the text div which tells us what have we done
function deleteTextDiv() {
  let textDiv = document.getElementById('textDiv');
  textDiv.remove();
}

function inputResize(element) {
  if (element.target.value.length == 0) {
    element.target.style.cssText = `width: 16px`;
  } else {
    element.target.style.cssText = `width: calc(0px + ${
      element.target.value.length * 9
    }px)`;
  }
}
