export const LANGUAGE_DICT = {
    'ukr': {
        navbar: {
            authenticateBtn: `задокументувати`,
            neverAuthenticatedBtn: `Я ніколи не перевірявся`,
            deauthenticateBtn: `вийти`
        },
        eventPage: {
            para: `Аутентифікуйтеся, щоб додати подію`,
            addEventBtn: `додати подію`
        },
        eventList: {
            eventFeed: `відомості`
        },
        eventDetail: {
            classification: `класифікація`,
            coordinates: `координати`,
            timestamp: `момент`,
            close: `видаляти`
        },
        addEventModal: {
            addEvent: `додати подію`,
            classifyEvent: `Класифікувати подію`,
            describeEvent: `Опишіть подію`,
        },
        authenticateModal: {
            authenticate: `задокументувати`,
        },
        neverAuthenticatedModal: {
            credentials: `вірчі грамоти`
        },
        formErrors: {
            emailIsRequired: `Електронна адреса обов’язкова.`,
            emailIsInvalid: `Електронна адреса неправильна.`,
            passwordIsRequired: `Потрібен пароль.`,
            passwordMinLength: `Пароль має містити не менше 10 символів.`,
            classifyEventRequired: `Класифікація необхідна.`,
            eventDescriptionRequired: `Потрібен опис.`,
            cannotExceed40Characters: `Не може перевищувати 40 символів.`,
            cannotExceed300Characters: `Не може перевищувати 300 символів.`
        },
        shared: {
            formHint: `Використовуйте не більше двох слів`,
            language: `Мову`,
            authFailed: `невдалий`,
            email: `електронна пошта`,
            password: `пароль`,
            submitBtn: `входити`,
            cancelBtn: `бекар`,
            noEvents: `Жодних звітів.`
        },
        snackbar: {
            successfullyAdded: `Додано успішно!`,
            deletedSucessfully: `Успішно видалено!`
        },
        location: {
            locationServiceOn: `То от ан евент, иур лоцатион муст бе шаред.` 
        },
        serverError: {
            error: `З вашим запитом сталася помилка.`
        }
    },
    'ru': {
        navbar: {
            authenticateBtn: `удостоверять`,
            neverAuthenticatedBtn: `Я ніколи не перевірявся`,
            deauthenticateBtn: `Выйти`
        },
        eventPage: {
            para: `я никогда не аутентифицировал`,
            addEventBtn: `Добавить событие`
        },
        eventList: {
            eventFeed: `Отчеты о событиях`
        },
        eventDetail: {
            classification: `Классификация`,
            coordinates: `Координаты`,
            timestamp: `время`,
            close: `Увольнять`
        },
        addEventModal: {
            addEvent: `Добавить событие`,
            classifyEvent: `Классифицировать событие`,
            describeEvent: `Описать событие`,
        },
        authenticateModal: {
            authenticate: `удостоверять`,
        },
        neverAuthenticatedModal: {
            credentials: `Реквизиты для входа`
        },
        formErrors: {
            emailIsRequired: `Электронная почта обязательна`,
            emailIsInvalid: `Электронная почта неверна.`,
            passwordIsRequired: `Необходим пароль.`,
            passwordMinLength: `Пароль должен быть не менее 10 символов.`,
            classifyEventRequired: `Требуется классификация.`,
            eventDescriptionRequired: `Требуется описание.`,
            cannotExceed40Characters: `Не может превышать 40 символов.`,
            cannotExceed300Characters: `Не может превышать 300 символов.`
        },
        shared: {
            formHint: `Используйте не более двух слов.`,
            language: `Язык`,
            authFailed: `Не удалось`,
            email: `Эл. адрес`,
            password: `Пароль`,
            submitBtn: `Войти`,
            cancelBtn: `Покинуть`,
            noEvents: `Нет е.`
        },
        snackbar: {
            successfullyAdded: `Добавлено успешно!`,
            deletedSucessfully: `Удален успешно!`
        },
        location: {
            locationServiceOn: `Чтобы добавить событие, необходимо сообщить о вашем местоположении.` 
        },
        serverError: {
            error: `В вашем запросе произошла ошибка.`
        }
    },
    'eng': {
        navbar: {
            authenticateBtn: `Authenticate`,
            neverAuthenticatedBtn: `I've never authenticated`,
            deauthenticateBtn: `Deauthenticate`
        },
        eventPage: {
            para: `Authenticate yourself to add an event.`,
            addEventBtn: `Add event`
        },
        eventList: {
            eventFeed: `Event feed`
        },
        eventDetail: {
            classification: `Classification`,
            coordinates: `Coordinates`,
            timestamp: `Timestamp`,
            close: `Close`
        },
        addEventModal: {
            addEvent: `Add event`,
            classifyEvent: `Classify event`,
            describeEvent: `Event description`,
        },
        authenticateModal: {
            authenticate: `Authenticate`,
        },
        neverAuthenticatedModal: {
            credentials: `Enter credentials`
        },
        formErrors: {
            emailIsRequired: `Email is required.`,
            emailIsInvalid: `Email is invalid.`,
            passwordIsRequired: `Password is required.`,
            passwordMinLength: `Password must be at least 10 characters.`,
            classifyEventRequired: `Classify event is required.`,
            eventDescriptionRequired: `Event description is required.`,
            cannotExceed40Characters: `Cannot exceed 40 characters.`,
            cannotExceed300Characters: `Cannot exceed 300 characters.`
        },
        shared: {
            formHint: `Use at most two words`,
            language: `Language`,
            authFailed: `Authentication failed`,
            email: `Email`,
            password: `Password`,
            submitBtn: `Submit`,
            cancelBtn: `Cancel`,
            noEvents: `There are currently no events.`
        },
        snackbar: {
            successfullyAdded: `Event added successfully!`,
            deletedSucessfully: `Event deleted successfully!`
        },
        location: {
            locationServiceOn: `Location must be on to add an event.` 
        },
        serverError: {
            error: `There was an error with your request.`
        }
    }
};