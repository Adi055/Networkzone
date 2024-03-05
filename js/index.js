$(document).ready(function () {
    // Define states and cities for each country
    const countriesData = {
        india: {
            states: ["Delhi", "Maharashtra", "Karnataka"],
            cities: {
                delhi: ["New Delhi"],
                maharashtra: ["Mumbai", "Pune"],
                karnataka: ["Bangalore"]
            }
        },
        usa: {
            states: ["New York", "California", "Texas"],
            cities: {
                newyork: ["New York City"],
                california: ["Los Angeles", "San Francisco"],
                texas: ["Houston", "Austin"]
            }
        }
        // Add more countries, states, and cities as needed
    };

    // Function to populate the state dropdown based on the selected country
    function populateStates(country) {
        const states = countriesData[country].states;
        const stateDropdown = $('#state');

        stateDropdown.empty().append('<option value="" selected>Select State</option>');

        $.each(states, function (index, state) {
            stateDropdown.append('<option value="' + state.toLowerCase() + '">' + state + '</option>');
        });

        stateDropdown.prop('disabled', false);
    }

    // Function to populate the city dropdown based on the selected state
    function populateCities(country, state) {
        const cities = countriesData[country].cities[state];
        const cityDropdown = $('#city');

        cityDropdown.empty().append('<option value="" selected>Select City</option>');

        $.each(cities, function (index, city) {
            cityDropdown.append('<option value="' + city.toLowerCase() + '">' + city + '</option>');
        });

        cityDropdown.prop('disabled', false);
    }

    // Event listener for country selection
    $('#country').change(function () {
        const selectedCountry = $(this).val();

        if (selectedCountry) {
            populateStates(selectedCountry);
            $('#state').val('');
            $('#city').val('');
            $('#city').prop('disabled', true);
        } else {
            // If no country is selected, disable and reset state and city dropdowns
            $('#state, #city').empty().prop('disabled', true);
        }
    });

    // Event listener for state selection
    $('#state').change(function () {
        const selectedCountry = $('#country').val();
        const selectedState = $(this).val();

        if (selectedCountry && selectedState) {
            populateCities(selectedCountry, selectedState);
        } else {
            // If no state is selected, disable and reset city dropdown
            $('#city').empty().prop('disabled', true);
        }
    });

// --------------for saving the form details---------------

// let formDataArray = []; // Array to store form data
// let currentFormIndex = 0;
let companyFormDataArray = []; // Array to store company form data
    let jobFormDataArray = []; // Array to store job form data
    let currentCompanyFormIndex = 0;
    let currentJobFormIndex = 0;
    let currentStep=1
        
      

        function saveCompanyFormData() {
            let companyFormData = {
                company_name: $('#company_name').val(),
                email: $('#email').val(),
                phone_number: $('#phone_number').val(),
                   address: $('#address').val(),
                   country: $('#country').val(),
                    state: $('#state').val(),
                    city: $('#city').val(),
                    zip: $('#zip').val(),
                    date: $('#date').val(),
                    category: $('#category').val(),
                    website: $('#website').val(),
                company_desc: $('#company_desc').val()
            };
    
            companyFormDataArray[currentCompanyFormIndex] = companyFormData;
    
            localStorage.setItem('companyFormDataArray', JSON.stringify(companyFormDataArray));
            localStorage.setItem('currentCompanyFormIndex', currentCompanyFormIndex);
        }



        function saveJobFormData() {
            let jobFormData = {
                job_title: $('#job_title').val(),
                job_category: $('#Job').val(),
                full_time: $('#full_time').prop('checked'),
                internship: $('#internship').prop('checked'),
                part_time: $('#part_time').prop('checked'),
                wfo: $('#wfo').prop('checked'),
                wfh: $('#wfh').prop('checked'),
                hybrid: $('#hybrid').prop('checked'),
                monthly_exp: $('#monthly').val(),
                currency: $('#currency').val(),
                start_date: $('#start_date').val(),
                end_date: $('#end_date').val(),
                evening: $('#evening').prop('checked'),
                overnight: $('#overnight').prop('checked'),
                early_morning: $('#early_morning').prop('checked'),
                exp: $('#Exp').val(),
                vacancy: $('#vacancy').val(),
                job_desc: $('#job_desc').val()
            };
        
            jobFormDataArray[currentJobFormIndex] = jobFormData;
        
            localStorage.setItem('jobFormDataArray', JSON.stringify(jobFormDataArray));
            localStorage.setItem('currentJobFormIndex', currentJobFormIndex);
        }
        

        // Function to load form data from local storage
        function loadCompanyFormData() {
            let storedCompanyFormData = JSON.parse(localStorage.getItem('companyFormDataArray')) || [];
        companyFormDataArray = storedCompanyFormData;

        let companyFormData = companyFormDataArray[currentCompanyFormIndex] || {};
            
            // Populate form fields with loaded data
            $('#company_name').val(companyFormData.company_name || '');
            $('#email').val(companyFormData.email || '');
            $('#phone_number').val(companyFormData.phone_number || '');
            $('#address').val(companyFormData.address || '');
            $('#country').val(companyFormData.country || '');
            $('#state').val(companyFormData.state || '');
            $('#city').val(companyFormData.city || '');
            $('#zip').val(companyFormData.zip || '');
            $('#date').val(companyFormData.date || '');
            $('#category').val(companyFormData.category || '');
            $('#website').val(companyFormData.website || '');
            $('#company_desc').val(companyFormData.company_desc || '');
        }

        function loadJobFormData() {
            let storedJobFormData = JSON.parse(localStorage.getItem('jobFormDataArray')) || [];
            jobFormDataArray = storedJobFormData;
        
            let jobFormData = jobFormDataArray[currentJobFormIndex] || {};
        
            // Populate job form fields with loaded data
            $('#job_title').val(jobFormData.job_title || '');
            $('#Job').val(jobFormData.job_category || '');
        
            // Populate radio buttons for job type
            $('#full_time').prop('checked', jobFormData.full_time || false);
            $('#internship').prop('checked', jobFormData.internship || false);
            $('#part_time').prop('checked', jobFormData.part_time || false);
        
            // Populate radio buttons for job location
            $('#wfo').prop('checked', jobFormData.wfo || false);
            $('#wfh').prop('checked', jobFormData.wfh || false);
            $('#hybrid').prop('checked', jobFormData.hybrid || false);
        
            $('#monthly').val(jobFormData.monthly_exp || '');
            $('#currency').val(jobFormData.currency || '');
            $('#start_date').val(jobFormData.start_date || '');
            $('#end_date').val(jobFormData.end_date || '');
        
            // Populate radio buttons for job schedule
            $('#evening').prop('checked', jobFormData.evening || false);
            $('#overnight').prop('checked', jobFormData.overnight || false);
            $('#early_morning').prop('checked', jobFormData.early_morning || false);
        
            $('#Exp').val(jobFormData.exp || '');
            $('#vacancy').val(jobFormData.vacancy || '');
            $('#job_desc').val(jobFormData.job_desc || '');
        }
        


        function validateForm() {
            // Basic validation for required fields
            let requiredFields = ['#company_name', '#email', '#phone_number', '#address', '#country', '#state', '#city', '#zip', '#date', '#category', '#website', '#company_desc'];

            for (let field of requiredFields) {
                
                
                if ($(field).val() === '') {
                    console.log(field);
                    return false; // Validation failed
                }
               
            }
            // Additional validation for dropdowns (country, state, city)
            if ($('#country').val() === '' || $('#state').val() === '' || $('#city').val() === '') {
                return false; // Validation failed
            }
        
            return true; // Validation passed
        }
      

        function validateJobForm() {
            // Basic validation for required fields in job details section
            let requiredJobFields = ['#job_title', '#Job', '#full_time', '#internship', '#part_time', '#wfo', '#wfh', '#hybrid', '#monthly', '#currency', '#start_date', '#end_date', '#evening', '#overnight', '#early_morning', '#Exp', '#vacancy', '#job_desc'];
        
            for (let field of requiredJobFields) {
                if ($(field).val() === '' && !$(field).prop('checked')) {
                  
                    return false; // Validation failed
                }
                console.log($(field).val());
            }
        
            // Additional validation for dropdowns or radio groups in job details section
            if ($('#Job').val() === '') {
                return false; // Validation failed
            }
        
            return true; // Validation passed
        }
        // Load data for the initial form
        loadCompanyFormData();
        loadJobFormData();

    var active = 1;

const updateProgress = () => {
    $('.step').each((i, step) => {
        if (i === (active - 1)) {
            $(step).addClass("active");
            $('.form_step').eq(i).addClass("active");
        } else {
            $(step).removeClass("active");
            $('.form_step').eq(i).removeClass("active");
        }
    });

    if (active === 1) {
        $('.prev').prop('disabled', true);
    } else if (active === $('.step').length) {
        $('.next').prop('disabled', true);
    } else {
        $('.prev').prop('disabled', false);
        $('.next').prop('disabled', false);
    }
};



$('.next').on("click", () => {
    if (currentStep === 1) {
        if (!validateForm()) {
            alert('Please fill in all the required fields in the company details section.');
            return; // Prevent moving to the next step
        }
        currentStep++
        console.log(currentStep);
        saveCompanyFormData();
        currentCompanyFormIndex++;
        loadCompanyFormData();
    } else if (currentStep === 2) {
        if (!validateJobForm()) {
            alert('Please fill in all the required fields in the job details section.');
            return; // Prevent moving to the next step
        }
        saveJobFormData();
        currentJobFormIndex++;
        loadJobFormData();
    }
    // ... (your existing code for updating progress and loading data)
    active++;
   if (active > $('.step').length) {
        active = $('.step').length;
     }
    updateProgress();
    $('input, select, textarea').val('');
});



$('.prev').on("click", () => {
    saveCompanyFormData(); // Save current form data before moving to the previous form
    saveJobFormData();
    active--;
    if (active < 1) {
        active=1;
    }
    updateProgress();
    // Decrement the current form index
    currentCompanyFormIndex--;
    currentJobFormIndex--;
    // Load data for the previous form
    loadCompanyFormData();
    loadJobFormData()
});


});

