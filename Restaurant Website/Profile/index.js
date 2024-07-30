// index.js

// Wait for the DOM to be ready
$(document).ready(function() {
    // Make an AJAX request to fetch the user profile
    $.ajax({
        url: '/Backend/Login/signup.js/signup', // Replace with your actual endpoint
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Update the profile section with the user's information
            updateProfileSection(response);
        },
        error: function(error) {
            console.error('Error fetching user profile:', error);
        }
    });

    // Function to update the profile section with user information
    function updateProfileSection(userProfile) {
        // Assuming there are elements with specific IDs to display user information
        $('#customer-name').text(userProfile.fName + ' ' + userProfile.lName);
        $('#customer-location').text(userProfile.location); // Assuming you have a 'location' property
        $('#customer-reviews').text(userProfile.reviews);
        $('#customer-orders').text(userProfile.orders);
        $('#customer-ratings').text(userProfile.ratings);
        
        // You might also update the image source dynamically
        $('#customer-image').attr('src', userProfile.profileImage); // Assuming you have a 'profileImage' property
    }
});
