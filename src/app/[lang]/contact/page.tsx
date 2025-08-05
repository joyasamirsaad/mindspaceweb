"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from "../../../../components/InputField";
import TextareaField from "../../../../components/TextareaField";
import RadioGroup from '../../../../components/RadioGroup';
import { useParams } from 'next/navigation';

export default function ContactUs() {
    const params = useParams();
    const lang = params.lang as string;
    const isRTL = lang === 'ar';

    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [meetingType, setMeetingType] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [meetingTime, setMeetingTime] = useState("");


    // Error state
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [meetingDateError, setMeetingDateError] = useState("");
    const [meetingTimeError, setMeetingTimeError] = useState("");

    // Submit button enabled
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    // Success message visibility
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Validation regexes
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation functions
    const validateName = (value:string) => {
        if (!value) return "Full name is required"; //check if empty
        if (value.length < 2)
        return "Name should be at least 2 characters long"; //check length
        if (!nameRegex.test(value))
        return "Name can only contain letters and spaces"; //check alphabet
        return "";
    };

    const validateEmail = (value:string) => {
        if (!value) return "Email is required"; //check if empty
        if (!emailRegex.test(value)) return "Please enter a valid email address"; //check format
        return "";
    };

    const validateCountry = (value: string) => {
        if (!value) return "Country is required";
        return "";
    };

    const phoneRegex = /^[0-9]+$/;
    const countryPhoneCodes: { [key: string]: string } = {
        "Lebanon": "+961",
        "United Arab Emirates": "+971",
        "United States": "+1",
        "United Kingdom": "+44",
        "Germany": "+49",
        "Australia": "+61"
    };

    const validatePhone = (value: string) => {
        if (!value) return "Phone number is required";
        if (!phoneRegex.test(value)) return "Phone number can only contain digits";
        return "";
    };

    const validateSubject = (value:string) => {
        if (!value.trim()) return "Subject is required"; //check if empty
        return "";
    };

    const validateMessage = (value:string) => { 
        if (!value.trim()) return "Message is required"; //check if empty
        if (value.trim().length < 10)
        return "Message must be at least 10 characters long"; //check length
        return "";
    };

    const validateMeetingDate = (value: string) => {
        if (!value) return "Meeting date is required";

        const selectedDate = new Date(value);
        const today = new Date();
        const futureDate = new Date(today.getFullYear() + 1, 0, 1); //1 year in the future
        today.setHours(0,0,0,0);
        if (isNaN(selectedDate.getTime())) return "Invalid date format";
        if (selectedDate < today) return "Meeting date must be today or later";
        if (selectedDate > futureDate) return "Meeting date cannot be this far in the future";
        return "";
    };

    const validateMeetingTime = (value: string) => {
        if (!value) return "Meeting time is required";

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(value)) return "Invalid time format";
        return "";
    };

    // Check overall form validity, every time there is a change in [name, email, subject, message]
    useEffect(() => {
        const isValid =
        !validateName(name) &&
        !validateEmail(email) &&
        !validateCountry(country) &&
        !validatePhone(phone) &&
        !validateSubject(subject) &&
        !validateMessage(message);
        (meetingType === "No Meeting Needed" || 
        (
            !validateMeetingDate(meetingDate) &&
            !validateMeetingTime(meetingTime)
        )
        );
        setIsSubmitDisabled(!isValid);
    }, [name, email, country, phone, subject, message, meetingType, meetingDate, meetingTime, validateName, validateEmail, validateCountry, validatePhone, validateSubject, validateMessage, validateMeetingDate, validateMeetingTime]);

    // Handlers for blur events (to show errors)
    const handleNameBlur = () => setNameError(validateName(name));
    const handleEmailBlur = () => setEmailError(validateEmail(email));
    const handleCountryBlur = () => setCountryError(validateCountry(country));
    const handlePhoneBlur = () => setPhoneError(validatePhone(phone));
    const handleSubjectBlur = () => setSubjectError(validateSubject(subject));
    const handleMessageBlur = () => setMessageError(validateMessage(message));
    const handleMeetingDateBlur = () => setMeetingDateError(validateMeetingDate(meetingDate));
    const handleMeetingTimeBlur = () => setMeetingTimeError(validateMeetingTime(meetingTime));

    // On form submit
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Final validation before submit
        const nError = validateName(name);
        const eError = validateEmail(email);
        const countryErr = validateCountry(country);
        const phoneErr = validatePhone(phone);
        const sError = validateSubject(subject);
        const mError = validateMessage(message);
        const meetingDateErr = meetingType !== "No Meeting Needed" ? validateMeetingDate(meetingDate) : "";
        const meetingTimeErr = meetingType !== "No Meeting Needed" ? validateMeetingTime(meetingTime) : "";

        setNameError(nError);
        setEmailError(eError);
        setCountryError(countryErr);
        setPhoneError(phoneErr);
        setSubjectError(sError);
        setMessageError(mError);
        setMeetingDateError(meetingDateErr);
        setMeetingTimeError(meetingTimeErr);

        if (nError || eError || sError || mError || meetingDateErr || meetingTimeErr) {
            return; // don't submit if invalid
        }

        setShowConfirm(true);

        // Show success message
        /*setShowSuccessMessage(true);

        // Reset form fields
        setName("");
        setEmail("");
        setCountry("");
        setPhone("");
        setSubject("");
        setMessage("");
        setMeetingType("");
        setMeetingDate("");
        setMeetingTime("");

        setTimeout(() => setShowSuccessMessage(false), 1000);*/
    };

    return (
        <>
        <div className="bg-black">
        <section id="contact" className="container mx-auto px-4 md:px-20 py-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-white">Send us a message</h1>
        <div className="contactus">
            <form method="POST" data-netlify="true" id="contactForm" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Full Name
                <span className="text-[#E74C3C]"> *</span>
            </label>
            <InputField type="text" name="name" placeholder="Full Name" value={name} error={nameError} onChange={(e) => setName(e.target.value)} onBlur={handleNameBlur}/>
            
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email
                <span className="text-[#E74C3C]"> *</span>
            </label>
            <InputField type="email" name="email" placeholder="your.email@example.com" value={email} error={emailError} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur}/>

            <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                    Country
                    <span className="text-[#E74C3C]"> *</span>
                </label>
                <select
                    id="country" name="country" value={country}
                    onChange={(e) => {
                        const selectedCountry = e.target.value;
                        setCountry(selectedCountry);
                        setPhoneCode(countryPhoneCodes[selectedCountry] || "");
                    }}
                    onBlur={handleCountryBlur}
                    className="inputform text-white bg-black !p-2"
                >
                    <option value="">Select a country</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                </select>
                {countryError && <p className="text-red-500 text-sm mt-1">{countryError}</p>}
            </div>

            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                Phone Number
                <span className="text-[#E74C3C]"> *</span>
            </label>
            <div className="flex gap-2">
                <input type="text" value={phoneCode} readOnly className="inputform !max-w-20" aria-label="Phone Code"/>
                <InputField type="tel" name="phone" placeholder="Phone Number" value={phone} error={phoneError} onChange={(e) => setPhone(e.target.value)} onBlur={handlePhoneBlur}/>
            </div>

            <label htmlFor="Subject" className="block text-sm font-medium text-white mb-1">
                Subject
                <span className="text-[#E74C3C]"> *</span>
            </label>
            <InputField type="text" name="subject" placeholder="Subject" value={subject} error={subjectError} onChange={(e) => setSubject(e.target.value)} onBlur={handleSubjectBlur}/>
            
            <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                Message
                <span className="text-[#E74C3C]"> *</span>
            </label>
            <TextareaField name="message" placeholder="Tell us what you&apos;re looking for..." value={message} error={messageError} onChange={(e) => setMessage(e.target.value)} onBlur={handleMessageBlur}/>
            
            <RadioGroup name="meeting" legend="Select the Meeting Request Type"
                options={[
                    { value: "Phone consultation", label: "Phone consultation" },
                    { value: "Video Call", label: "Video Call" },
                    { value: "In-person Meeting", label: "In-person Meeting" },
                    { value: "No Meeting Needed", label: "No Meeting Needed" },
                ]}
                selected={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
            />

            {meetingType && meetingType !== "No Meeting Needed" && (
                <>
                <label htmlFor="meetingDate" className="block text-sm font-medium text-white mt-4 mb-1">
                    Preferred Meeting Date
                    <span className="text-[#E74C3C]"> *</span>
                </label>
                <InputField type="date" name="meetingDate" placeholder="Meeting Date" value={meetingDate} error={meetingDateError} onChange={(e) => setMeetingDate(e.target.value)} onBlur={handleMeetingDateBlur}
                />

                <label htmlFor="meetingTime" className="block text-sm font-medium text-white mt-4 mb-1">
                Preferred Meeting Time
                <span className="text-[#E74C3C]"> *</span>
                </label>
                <InputField type="time" name="meetingTime" placeholder="Meeting Time" value={meetingTime} error={meetingTimeError} onChange={(e) => setMeetingTime(e.target.value)} onBlur={handleMeetingTimeBlur}/>
                </>
            )}


            <button className="btn send" type="submit" disabled={isSubmitDisabled}><i className={`fa-regular fa-paper-plane text-[#fff8f0] ${isRTL ? 'ml-2' : 'mr-2'}`}></i>Submit</button>
            {/*the button will be disabled if isSubmitDisabled = true*/}
            {showSuccessMessage && ( <div id="contactsuccessMessage" className="text-center mt-4 text-green-600 font-semibold">Message sent successfully!</div>)}
            {/*when showSuccessMessage true, set message to message sent successfully and display*/}
            </form>

            {showConfirm && (
            <div className="fixed inset-0 bg-white/20 text-white flex items-center justify-center z-50">
                <div className="bg-black rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Submission</h2>
                <p className="mb-6">Are you sure you want to submit your form?</p>
                <div className="flex justify-end gap-4">
                    <button className="text-[#3498DB] hover:text-[#E74C3C]" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button className="btn" onClick={() => {
                        setShowConfirm(false);
                        setShowSuccessMessage(true);

                        
                        setName("");
                        setEmail("");
                        setCountry("");
                        setPhone("");
                        setSubject("");
                        setMessage("");
                        setMeetingType("");
                        setMeetingDate("");
                        setMeetingTime("");

                        setTimeout(() => setShowSuccessMessage(false), 1000);

                        router.push('/');
                    }}
                    >Yes</button>
                </div>
                </div>
            </div>
            )}

        </div> 

        </section>
        </div>
        </>
    );
}