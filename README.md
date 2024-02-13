
# Codama

Codama Task
![Logo](https://images.qlason.com/HDWreC3XNZQTP5HDb57zn2RYovR4iTKjm5AAxcmS.png)


## Appendix

Task

Your task is to create a web application that allows users to authenticate via mobile phone number
(SMS code verification). Once authenticated, the user should be presented with a "Profile Page"
containing "Name" and "Email" fields and a "Save" button. The "Save" button must store the form
data in Firestore, using the phone number as the primary key. Ensure the form allows for the update
and saving of these fields, with validations in place for non-empty "Name" and a valid "Email".

Features to include:
1. Persistent user login across page refreshes and return visits.

2. A "Logout" button for user sign-out, with functionality to log back in and view previously entered data.
3. The application should be deployed under a secure HTTPS URL.


## Documentation

[Deployed Version](https://codama-gndu.vercel.app)
[Documentation](https://github.com/Adebayo27/codama.git)

1. Clone the repository
2. cd into the project root folder
3. Install the dependencies 


## Run Locally

Clone the project

```bash
  git clone https://github.com/Adebayo27/codama.git
```

Go to the project directory (Frontend)

```bash
  cd codama
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


