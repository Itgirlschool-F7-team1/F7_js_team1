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
    
    
    if (age.value === '' || weight.value === '' || height.value === '' || 80 < age.value || age.value < 15) {
    errorMessage('Проверьте, что введенные вами значения верны')
    } else if(gender.id === 'male' && activity === "very-low_action") {
      totalCalories.value = Math.round(1.2 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
    } else if(gender.id === 'male' && activity === "low_action") {
      totalCalories.value = Math.round(1.375 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
    } else if (gender.id === 'male' && activity === "middle_action") {
      totalCalories.value = Math.round(1.55 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
    } else if(gender.id === 'male' && activity === "high_action") {
      totalCalories.value = Math.round(1.725 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))));
    } else if(gender.id === 'male' && activity === "very-high_action") {
      totalCalories.value = Math.round(1.9 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value))))
    ;
    } else if(gender.id === 'female' && activity === "very-low_action") {
      totalCalories.value = Math.round(1.2 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "low_action") {
      totalCalories.value = Math.round(1.375 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "middle_action") {
      totalCalories.value = Math.round(1.55 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
    } else if(gender.id === 'female' && activity === "high_action") {
      totalCalories.value = Math.round(1.725* (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value))));
    } else {
      totalCalories.value = Math.round(1.9 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age.value))));
    } 

    document.getElementById('results').style.display = 'block';
}

function errorMessage(error) {
    document.getElementById('results').style.display = 'none';

    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError);
}

function clearError() {
    document.querySelector('.alert').remove();
}