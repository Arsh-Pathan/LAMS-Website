"use server";

import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form submission
export async function submitContactForm(formData: FormData) {
  try {
    // Simulate a delay for the form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    // Basic validation
    if (!name || !email || !message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // Log form submission
    console.log("Form submitted:", { name, email, phone, message });

    // Send email to school admin with form data
    await resend.emails.send({
      from: "Little Angels Model School <no-littleangelsmodelschool5@gmail.com>", // Replace with your verified sender email
      to: "mail.arsh.pathan@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <img src="/images/logo.png" alt="Little Angels Model School" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h2 style="color: #d32f2f; text-align: center;">New Contact Form Submission</h2>
          <p style="color: #333; font-size: 16px;"><strong>Name:</strong> ${name}</p>
          <p style="color: #333; font-size: 16px;"><strong>Email:</strong> ${email}</p>
          <p style="color: #333; font-size: 16px;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p style="color: #333; font-size: 16px;"><strong>Message:</strong> ${message}</p>
          <p style="color: #333; font-size: 16px;">Please follow up with the submitter for further details.</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #0288d1; font-size: 14px; text-align: center;">Little Angels Model School | Nurturing Young Minds</p>
        </div>
      `,
    });

    // Send thank-you email to submitter
    await resend.emails.send({
      from: "Little Angels Model School <no-littleangelsmodelschool5@gmail.com>",
      to: email,
      subject: "Thank You for Contacting Little Angels Model School",
      html: `
        <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <img src="/images/logo.png" alt="Little Angels Model School" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h2 style="color: #d32f2f; text-align: center;">Thank You, ${name}!</h2>
          <p style="color: #333; font-size: 16px;">We have received your message at Little Angels Model School.</p>
          <p style="color: #333; font-size: 16px;"><strong>Your Message:</strong> ${message}</p>
          <p style="color: #333; font-size: 16px;">Our team will get back to you soon to assist you further.</p>
          <p style="color: #333; font-size: 16px;">We look forward to connecting with you!</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #0288d1; font-size: 14px; text-align: center;">Little Angels Model School | Nurturing Young Minds</p>
        </div>
      `,
    });

    // Return success response
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return {
      success: false,
      message: "Failed to submit contact form. Please try again.",
    };
  }
}

// Newsletter subscription
export async function subscribeToNewsletter(formData: FormData) {
  // Simulate a delay for the form submission
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Get email
  const email = formData.get("email") as string;

  console.log("Newsletter subscription:", { email });

  // Return success response
  return {
    success: true,
    message: "Thank you for subscribing to our newsletter!",
  };
}

// Enrollment request
export async function requestEnrollment(formData: FormData) {
  try {
    // Simulate a delay for the form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get form data
    const childName = formData.get("childName") as string;
    const childAge = formData.get("childAge") as string;
    const program = formData.get("program") as string;
    const parentName = formData.get("parentName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    // Basic validation
    if (!childName || !childAge || !program || !parentName || !email || !phone) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // Log enrollment request
    console.log("Enrollment request:", { childName, childAge, program, parentName, email, phone });

    // Send email to school admin with form data
    await resend.emails.send({
      from: "Little Angels Model School <no-littleangelsmodelschool5@gmail.com>", // Replace with your verified sender email
      to: "mail.arsh.pathan@gmail.com",
      subject: "New Enrollment Request",
      html: `
        <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <img src="https://yourdomain.com/logo.png" alt="Little Angels Model School" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h2 style="color: #d32f2f; text-align: center;">New Enrollment Request</h2>
          <p style="color: #333; font-size: 16px;"><strong>Child's Name:</strong> ${childName}</p>
          <p style="color: #333; font-size: 16px;"><strong>Child's Age:</strong> ${childAge}</p>
          <p style="color: #333; font-size: 16px;"><strong>Program:</strong> ${program}</p>
          <p style="color: #333; font-size: 16px;"><strong>Parent/Guardian Name:</strong> ${parentName}</p>
          <p style="color: #333; font-size: 16px;"><strong>Email:</strong> ${email}</p>
          <p style="color: #333; font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
          <p style="color: #333; font-size: 16px;">Please follow up with the parent/guardian for further details.</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #0288d1; font-size: 14px; text-align: center;">Little Angels Model School | Nurturing Young Minds</p>
        </div>
      `,
    });

    // Send thank-you email to parent
    await resend.emails.send({
      from: "Little Angels Model School <no-littleangelsmodelschool5@gmail.com>", // Replace with your verified sender email
      to: email,
      subject: "Thank You for Your Enrollment Request",
      html: `
        <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <img src="https://yourdomain.com/logo.png" alt="Little Angels Model School" style="max-width: 200px; display: block; margin: 0 auto 20px;">
          <h2 style="color: #d32f2f; text-align: center;">Thank You, ${parentName}!</h2>
          <p style="color: #333; font-size: 16px;">We have received your enrollment request for ${childName} in our ${program} program at Little Angels Model School.</p>
          <p style="color: #333; font-size: 16px;">Our admissions team will contact you shortly to discuss the next steps.</p>
          <p style="color: #333; font-size: 16px;">Thank you for choosing Little Angels Model School to nurture your child's growth!</p>
          <hr style="border: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #0288d1; font-size: 14px; text-align: center;">Little Angels Model School | Nurturing Young Minds</p>
        </div>
      `,
    });

    // Return success response
    return {
      success: true,
      message: "Thank you for your interest! Our admissions team will contact you shortly.",
    };
  } catch (error) {
    console.error("Error in requestEnrollment:", error);
    return {
      success: false,
      message: "Failed to process enrollment request. Please try again.",
    };
  }
}

// View more gallery images
export async function loadMoreGalleryImages() {
  // In a real application, you would fetch more images from a database or API
  // For now, we'll just return some placeholder images
  const additionalImages = [
    {
      src: "/images/gallery/tree.jpg?height=400&width=600",
      alt: "Tree Planting",
      category: "Activities",
    },
    {
      src: "/images/gallery/archery.jpg?height=400&width=600",
      alt: "Archery",
      category: "Activities",
    },
    {
      src: "/images/gallery/macgic.jpg?height=400&width=600",
      alt: "Macgic Show",
      category: "Activities",
    },
  ];

  return additionalImages;
}