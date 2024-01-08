import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
    en: {
        translation: {
            "submit": "Submit",
            "signout": "Sign Out",
            "account": "Profile",
            "signin": "Sign In",
            "oldestData": "Oldest First",
            "newestData": "Newest First",
            "all": "All Tasks",
            "completed": "Completed",
            "not-completed": "Not Completed",
            "AddNewTask": "Add new Task",
            "AddyourTask": "Add your Tasks",
            "add": "Add",
            "cancel": "Cancel",
            "addmore": "Add More",
            "deletetask": "Delete all Tasks",
            "please": "Please ",
            "tocontinue": " to continue... ",
            "signup": "Sign Up",
            "createnewaccount": "Create a new account",
            "allready": "Allready have an account ",
            "account?": "Don't have an account ",
            "forgotpass": "Forgot Password",
            "resetpass": "Forgot Password",
            "pleaseverify": "Please verify your email to continue",
            "welcome": "Welcome",
            "sendemail": "Resend Email",
            "userName": "User Name: ",
            "lastSignIn": "Last Sign in: ",
            "accountCreated": "Account Created: ",
            "email": "Email: ",
            "deleteAccount": "Delete Account: ",
            "weSendYouEmail": "We send you an email to verify your Account",
            "sendAgain": "Send again",
            "pleaseCheckYourEmail": "Please check your Email to reset your password",
            "addedSuccessfully": "Task added successfully",
        }
    },
    de: {
        translation: {
            "submit": "Submit",
            "signout": "Ausloggen",
            "account": "Profil",
            "signin": "Einloggen",
            "oldestData": "Älteste zuerst",
            "newestData": "Neueste zuerst",
            "all": "Alle Aufgaben",
            "completed": "Beendet",
            "not-completed": "Nicht Beendet",
            "AddNewTask": "Neue Aufgabe hinzufügen",
            "AddyourTask": "Füge deine Aufgabe hinzu",
            "add": "hinzufügen",
            "cancel": "Stornieren",
            "addmore": "Mehr Hinzufügen",
            "deletetask": "Alle Aufgaben Löschen",
            "please": "Bitte ",
            "tocontinue": " um fortzufahren... ",
            "signup": "Registrieren",
            "createnewaccount": "Neuen Account erstellen",
            "allready": "Habe bereits ein Konto ",
            "account?": "Habe kein Konto ",
            "forgotpass": "Passwort vergessen",
            "resetpass": "Passwort zurücksetzen",
            "welcome": "Willkommen",
            "pleaseverify": "Bitte bestätige deine E-Mail-Adresse, um fortzufahren",
            "sendemail": "Email erneut senden",
            "userName": "Benutzername: ",
            "lastSignIn": "Letztes Einloggen: ",
            "accountCreated": "Profil erstellt: ",
            "email": "Email: ",
            "deleteAccount": "Profil löschen: ",
            "weSendYouEmail": "Wir senden dir eine E-Mail zur Bestätigung deines Profiles",
            "sendAgain": "Nochmal senden",
            "pleaseCheckYourEmail": "Bitte überprüfe deine E-Mails, um dein Passwort zurückzusetzen",
            "addedSuccessfully": "Aufgabe erfolgreich hinzugefügt",
        }
    },
    ar: {
        translation: {
            "submit": "ادخال",
            "signout": "تسجيل الخروج",
            "account": "حسابك",
            "signin": "تسجيل الدخول",
            "oldestData": "الأقدم أولا",
            "newestData": "الأحدث أولاً",
            "all": "كل المهام",
            "completed": "مكتمل",
            "not-completed": "لم يكتمل",
            "AddNewTask": "إضافة مهمة جديدة",
            "AddyourTask": "أضف مهمتك",
            "add": "إضافه",
            "cancel": "إلغاء",
            "addmore": "أضف المزيد",
            "deletetask": "حذف كافة المهام",
            "please": "الرجاء ",
            "tocontinue": " للاشتراك ",
            "signup": "انشاء حساب",
            "createnewaccount": "انشاء حساب جديد",
            "allready": "لديك حساب بالفعل ",
            "account?": "ليس لديك حساب ",
            "forgotpass": "نسيت كلمة السر",
            "resetpass": "إعادة تعيين كلمة المرور",
            "welcome": "مرحباً",
            "pleaseverify": "يرجى التحقق من بريدك الإلكتروني للمتابعة",
            "sendemail": "إعادة إرسال البريد الإلكتروني",
            "userName": "User Name: ",
            "lastSignIn": "Last Sign in: ",
            "accountCreated": "Account Created: ",
            "email": "Email: ",
            "deleteAccount": "حذف الحساب: ",
            "weSendYouEmail": "نرسل لك بريدًا إلكترونيًا للتحقق من حسابك",
            "sendAgain": "أعد الإرسال",
            "pleaseCheckYourEmail": "يرجى التحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك",
            "addedSuccessfully": "تمت إضافة المهمة بنجاح",
        }
    }
};


i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        detection: {
            order: ['localStorage', 'htmlTag'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        react: {
            useSuspense: false
        }

    });

export default i18n;