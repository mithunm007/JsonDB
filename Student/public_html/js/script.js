// script.js

// Function to validate and get form data
function validateAndGetFormData() {
    var rollNoVar = $("#rollNo").val().trim();
    if (rollNoVar === "") {
        alert("Roll Number is a required field.");
        $("#rollNo").focus();
        return "";
    }

    var fullNameVar = $("#fullName").val().trim();
    if (fullNameVar === "") {
        alert("Full Name is a required field.");
        $("#fullName").focus();
        return "";
    }

    var classVar = $("#class").val().trim();
    if (classVar === "") {
        alert("Class is a required field.");
        $("#class").focus();
        return "";
    }

    var birthDateVar = $("#birthDate").val().trim();
    if (birthDateVar === "") {
        alert("Birth Date is a required field.");
        $("#birthDate").focus();
        return "";
    }

    var addressVar = $("#address").val().trim();
    if (addressVar === "") {
        alert("Address is a required field.");
        $("#address").focus();
        return "";
    }

    var enrollmentDateVar = $("#enrollmentDate").val().trim();
    if (enrollmentDateVar === "") {
        alert("Enrollment Date is a required field.");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };

    return JSON.stringify(jsonStrObj);
}

// Function to reset form
function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#rollNo").focus();
    $("#studentUpdate").prop("disabled", true);
    $("#studentSave").prop("disabled", false);
    $("#rollNo").prop("disabled", false);
}

// Function to save student data
function saveStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }

    var putReqStr = createPUTRequest("90936861|-31948784479254024|90932362",
            jsonStr, "Student", "Student-Rel");

    // Uncomment the next line for debugging purposes
    // alert(putReqStr);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});

    if (resultObj !== "") {
        try {
            var parseJson = JSON.parse(resultObj);
            if (parseJson.status === 200 || parseJson.status === 201) {
                alert("Student data saved successfully!");
                resetForm();
            } else {
                alert("Error saving student data: " + parseJson.responseText);
            }
        } catch (e) {
            alert("Error parsing response: " + e.message);
        }
    } else {
        alert("No response from server.");
    }
}

// Function to update student data
function updateStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }

    var putReqStr = createPUTRequest("90936861|-31948784479254024|90932362",
            jsonStr, "Student", "Student-Rel");

    // Uncomment the next line for debugging purposes
    // alert(putReqStr);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});

    if (resultObj !== "") {
        try {
            var parseJson = JSON.parse(resultObj);
            if (parseJson.status === 200 || parseJson.status === 201) {
                alert("Student data updated successfully!");
                resetForm();
            } else {
                alert("Error updating student data: " + parseJson.responseText);
            }
        } catch (e) {
            alert("Error parsing response: " + e.message);
        }
    } else {
        alert("No response from server.");
    }
}

// Function to fetch student data by Roll Number
function fetchStudent(rollNo) {
    var getReqStr = createGET_BY_KEYRequest("90936861|-31948784479254024|90932362",
            "Student", "Student-Rel", rollNo);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});

    if (resultObj !== "") {
        try {
            var parseJson = JSON.parse(resultObj);
            if (parseJson.status === 200 || parseJson.status === 201) {
                if (parseJson.RECORDS.length > 0) {
                    var studentRecord = parseJson.RECORDS[0].record;
                    $("#fullName").val(studentRecord.fullName);
                    $("#class").val(studentRecord.class);
                    $("#birthDate").val(studentRecord.birthDate);
                    $("#address").val(studentRecord.address);
                    $("#enrollmentDate").val(studentRecord.enrollmentDate);
                    $("#studentUpdate").prop("disabled", false);
                    $("#studentSave").prop("disabled", true);
                    $("#rollNo").prop("disabled", true);
                } else {
                    alert("No student found with Roll Number: " + rollNo);
                    resetForm();
                }
            } else {
                alert("Error fetching student data: " + parseJson.responseText);
            }
        } catch (e) {
            alert("Error parsing response: " + e.message);
        }
    } else {
        alert("No response from server.");
    }
}

// Event Listener for Roll Number field (on blur)
$(document).ready(function() {
    $("#rollNo").blur(function() {
        var rollNo = $("#rollNo").val().trim();
        if (rollNo !== "") {
            fetchStudent(rollNo);
        }
    });

    // Event Listener for Save Button
    $("#studentSave").click(function() {
        saveStudent();
    });

    // Event Listener for Update Button
    $("#studentUpdate").click(function() {
        updateStudent();
    });

    // Event Listener for Reset Button
    $("#studentReset").click(function() {
        resetForm();
    });
});
