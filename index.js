document.addEventListener('DOMContentLoaded', function() {
    const semesterTable = document.querySelector('#semester-table tbody');
    const addRowButton = document.getElementById('add-row-button');
    const semesterCalculateBtn = document.getElementById('semester-btn-cal');
    const semesterClearBtn = document.getElementById('semester-btn-clear');
    const semesterResultInput = document.getElementById('semester-result');
    const cumulativeCalculateBtn = document.getElementById('cgpa-btn-cal');
    const cumulativeClearBtn = document.getElementById('cgpa-btn-clear');
    const cumulativeUnitsInput = document.getElementById('cumulative-units');
    const cumulativeGpInput = document.getElementById('cumulative-gp');
    const cgpaResultInput = document.getElementById('cgpa-result');
  
    addRowButton.addEventListener('click', addRow);
    semesterCalculateBtn.addEventListener('click', calculateSGPA);
    semesterClearBtn.addEventListener('click', clearSemesterSelections);
    cumulativeCalculateBtn.addEventListener('click', calculateCGPA);
    cumulativeClearBtn.addEventListener('click', clearCumulativeInputs);
  
    function addRow() {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><input type="text" class="course-code-input" placeholder="Course Code Goes Here"></td>
        <td>
          <select class="course-unit">
            <option value="">Select Unit</option>
            ${createOptions(1,2,3,4)}
          </select>
        </td>
        <td>
          <select class="grade">
            <option value="">Select Grade</option>
            ${createOptions('A',"B","C","D","E",'F')}
          </select>
        </td>
      `;
      semesterTable.appendChild(newRow);
    }
  
    function calculateSGPA() {
      const units = Array.from(document.querySelectorAll('#semester-table .course-unit'));
      const grades = Array.from(document.querySelectorAll('#semester-table .grade'));
  
      let totalGradePoints = 0;
      let totalUnits = 0;
      let isValid = true;
  
      units.forEach((unitSelect, index) => {
        const unit = parseInt(unitSelect.value, 10);
        const grade = grades[index].value;
        const gradePoints = gradeToPoints(grade);
  
        if (unit && !isNaN(unit) && !isNaN(gradePoints)) {
          totalGradePoints += unit * gradePoints;
          totalUnits += unit;
        } else {
          isValid = false;
          alert('Please ensure all course units and grades are selected correctly.');
          return;
        }
      });
  
      if (isValid && totalUnits > 0) {
        semesterResultInput.value = (totalGradePoints / totalUnits).toFixed(2);
      } else {
        semesterResultInput.value = '';
      }
    }
  
    function calculateCGPA() {
      const totalCumulativeUnits = parseFloat(cumulativeUnitsInput.value) || 0;
      const totalCumulativeGp = parseFloat(cumulativeGpInput.value) || 0;
      const currentSGPA = parseFloat(semesterResultInput.value) || 0;
  
      if (isNaN(totalCumulativeUnits) || isNaN(totalCumulativeGp)) {
        alert('Please provide valid cumulative units and grade points.');
        return;
      }
  
      const units = Array.from(document.querySelectorAll('#semester-table .course-unit'));
      const grades = Array.from(document.querySelectorAll('#semester-table .grade'));
  
      let currentUnits = 0;
      let currentGradePoints = 0;
  
      units.forEach((unitSelect, index) => {
        const unit = parseInt(unitSelect.value, 10);
        const grade = grades[index].value;
        const gradePoints = gradeToPoints(grade);
  
        if (unit && !isNaN(unit) && !isNaN(gradePoints)) {
          currentUnits += unit;
          currentGradePoints += unit * gradePoints;
        }
      });
  
      const newTotalUnits = totalCumulativeUnits + currentUnits;
      const newTotalGp = totalCumulativeGp + currentGradePoints;
  
      if (newTotalUnits > 0) {
        cgpaResultInput.value = (newTotalGp / newTotalUnits).toFixed(2);
      } else {
        cgpaResultInput.value = '';
        alert('No units found for CGPA calculation.');
      }
    }
  
    function clearSemesterSelections() {
      semesterTable.innerHTML = '';
      semesterResultInput.value = '';
    }
  
    function clearCumulativeInputs() {
      cumulativeUnitsInput.value = '';
      cumulativeGpInput.value = '';
      cgpaResultInput.value = '';
    }
  
    function createOptions(start, end) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
        .map(value => `<option value="${value}">${value}</option>`)
        .join('');
    }
  
    function createOptions(...values) {
      return values.map(value => `<option value="${value}">${value}</option>`).join('');
    }
  
    function gradeToPoints(grade) {
      const gradePoints = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };
      return gradePoints[grade] || NaN;
    }
  });
