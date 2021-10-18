document.getElementById('calories-calc_form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateCalories);

    e.preventDefault();
});
function calculateCalories(e) {
    
    const age = document.getElementById('calc_age');
    const gender = document.querySelector('input[name="customRadioInline1"]:checked');
    const weight = document.getElementById('calc_weight');
    const height = document.getElementById('calc_height');
    const activity = document.getElementById('list').value;
    const totalCalories = document.getElementById('total-calories');
    const minCalories = document.getElementById('min-calories');
    const maxCalories = document.getElementById('max-calories');
  
    
    if (age.value === '' || weight.value === '' || height.value === '' || 80 < age.value || age.value < 15) {
    errorMessage('Проверьте, что введенные вами значения верны!')
    } else if(gender.id === 'male' && activity === "very-low_action") {
      totalCalories.value = Math.round(1.2 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
      clearError()
    } else if(gender.id === 'male' && activity === "low_action") {
      totalCalories.value = Math.round(1.375 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
      clearError()
    } else if (gender.id === 'male' && activity === "middle_action") {
      totalCalories.value = Math.round(1.55 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
      clearError()
    } else if(gender.id === 'male' && activity === "high_action") {
      totalCalories.value = Math.round(1.725 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
      clearError()
    } else if(gender.id === 'male' && activity === "very-high_action") {
      totalCalories.value = Math.round(1.9 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))))
    ;
    clearError()
    } else if(gender.id === 'female' && activity === "very-low_action") {
      totalCalories.value = Math.round(1.2 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
      clearError()
    } else if(gender.id === 'female' && activity === "low_action") {
      totalCalories.value = Math.round(1.375 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
      clearError()
    } else if(gender.id === 'female' && activity === "middle_action") {
      totalCalories.value = Math.round(1.55 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
      clearError()
    } else if(gender.id === 'female' && activity === "high_action") {
      totalCalories.value = Math.round(1.725* (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
      clearError()
    } else {
      totalCalories.value = Math.round(1.9 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age.value))));
      clearError()
    } 

      
    if(totalCalories.value > 0){
     maxCalories.value = Math.round(totalCalories.value * 1.15);
     minCalories.value = Math.round(totalCalories.value * 0.85);
  }  
  
    document.getElementById('results').style.display = 'block';
}

function errorMessage(error) {
  const totalCalories = document.getElementById('total-calories');
  const minCalories = document.getElementById('min-calories');
  const maxCalories = document.getElementById('max-calories');

document.getElementById('results').style.display = 'none';
document.querySelector('.calc-error').innerHTML = error
totalCalories.value = "";
maxCalories.value = "";
minCalories.value = "";
}
function clearError() {
  document.querySelector('.calc-error').innerHTML = '';
}