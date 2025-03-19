export interface BaseQuestion {
    id: number;
    type: 'text' | 'radio' | 'checkbox' | 'select' | 'date' | 'time' | 'file' | 'codeText' | 'codeFile';
    title: string;
    description?: string;
    img?: string;
    required: boolean;
    userAnswer?: any;
    correctAnswer?: any;
}

export interface Option {
    id: number;
    text?: string;
    img?: string;
}

export interface OptionQuestion extends BaseQuestion {
    options: Option[];
}

export interface TextQuestion extends BaseQuestion {
    type: 'text';
    userAnswer?: string;
    correctAnswer?: string;
}

export interface RadioQuestion extends OptionQuestion {
    type: 'radio';
    userAnswer?: string;
    correctAnswer?: string;
}

export interface CheckboxQuestion extends OptionQuestion {
    type: 'checkbox';
    userAnswer?: string[];
    correctAnswer?: string[];
}

export interface SelectQuestion extends OptionQuestion {
    type: 'select';
    userAnswer?: string;
    correctAnswer?: string;
}

export interface DateQuestion extends BaseQuestion {
    type: 'date';
    userAnswer?: string; // Format: YYYY-MM-DD
    correctAnswer?: string; // Format: YYYY-MM-DD
}

export interface TimeQuestion extends BaseQuestion {
    type: 'time';
    userAnswer?: string; // Format: HH:mm
    correctAnswer?: string; // Format: HH:mm
}

export interface FileAnswer {
    filename: string;
    fileUrl: string;
}

export interface FileQuestion extends BaseQuestion {
    type: 'file';
    userAnswer?: FileAnswer;
}

export interface CodeTextQuestion extends BaseQuestion {
    type: 'codeText';
    userAnswer?: string; // Kode yang user input
}

export interface CodeFileQuestion extends BaseQuestion {
    type: 'codeFile';
    userAnswer?: FileAnswer;
}

export type Question =
    | TextQuestion
    | RadioQuestion
    | CheckboxQuestion
    | SelectQuestion
    | DateQuestion
    | TimeQuestion
    | FileQuestion
    | CodeTextQuestion
    | CodeFileQuestion;



export const dummyQuestions: Question[] = [
    {
        id: 1,
        type: "text",
        title: "Apa ibukota Indonesia?",
        description: "Jawab dengan satu kata.",
        img: "https://cdn-images-1.medium.com/max/1000/1*V2DR9jxRNyhZKqqXPY1cSg.jpeg",
        required: true,
        userAnswer: "",
        correctAnswer: "Jakarta",
    },
    {
        id: 2,
        type: "radio",
        title: "Siapa presiden pertama Indonesia?",
        required: true,
        options: [
            {
                id: 4,
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNeSG26zgwI1er1zKDxCNuVhTS8Fb6jgAckw&s',
                text: "Jokowi"
            },
            {
                id: 1,
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAtSNlpmP8tm0PImv6oUjiuNfDujrd6IjJnQ&s',
                text: "Soekarno"
            },
            {
                id: 2,
                img:'https://mmc.tirto.id/image/2016/08/04/TIRTO-soeharto.JPG',
                text: "Soeharto"
            },
            {
                id: 3,
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaopbeaMN6S43MKJLigWhxIDuNT8oZUAn3Bg&s',
                text: "Habibie"
            },

        ],
        userAnswer: "",
        correctAnswer: "Soekarno",
    },
    {
        id: 3,
        type: "checkbox",
        title: "Pilih provinsi di Pulau Jawa",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Indonesia_provinces_blank_map.svg",
        required: true,
        options: [
            { id: 1, text: "Jawa Barat" },
            { id: 2, text: "Jawa Tengah" },
            { id: 3, text: "Jawa Timur" },
            { id: 4, text: "Sumatra Utara" },
        ],
        userAnswer: [],
        correctAnswer: ["Jawa Barat", "Jawa Tengah", "Jawa Timur"],
    },
    {
        id: 4,
        type: "select",
        title: "Pilih mata uang resmi Jepang",
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/1000_yen_banknote_2004.jpg",
        required: true,
        options: [
            { id: 1, text: "Yen" },
            { id: 2, text: "Won" },
            { id: 3, text: "Dollar" },
            { id: 4, text: "Euro" },
        ],
        userAnswer: "",
        correctAnswer: "Yen",
    },
    {
        id: 5,
        type: "date",
        title: "Kapan Indonesia merdeka?",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/97/Proklamasi_Indonesia.jpg",
        required: true,
        userAnswer: "",
        correctAnswer: "1945-08-17",
    },
    {
        id: 6,
        type: "time",
        title: "Jam berapa matahari terbit di Jakarta?",
        img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Sunrise_in_Jakarta.jpg",
        required: false,
        userAnswer: "",
        correctAnswer: "06:00",
    },
    {
        id: 7,
        type: "file",
        title: "Upload CV dalam format PDF",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
        required: true,
    },
    {
        id: 8,
        type: "codeText",
        title: "Tulis program JavaScript untuk mencetak angka 1-10",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        required: true,
        userAnswer: "",
    },
    {
        id: 9,
        type: "codeFile",
        title: "Upload file kode Python yang mencetak 'Hello, World!'",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        required: true,
    },
    {
        id: 10,
        type: "radio",
        title: "Manakah planet terbesar di tata surya?",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
        required: true,
        options: [
            { id: 1, text: "Bumi" },
            { id: 2, text: "Mars" },
            { id: 3, text: "Jupiter" },
            { id: 4, text: "Venus" },
        ],
        userAnswer: "",
        correctAnswer: "Jupiter",
    },
    {
        id: 11,
        type: "checkbox",
        title: "Pilih warna primer",
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7f/AdditiveColor.svg",
        required: true,
        options: [
            { id: 1, text: "Merah" },
            { id: 2, text: "Hijau" },
            { id: 3, text: "Biru" },
            { id: 4, text: "Kuning" },
        ],
        userAnswer: [],
        correctAnswer: ["Merah", "Biru", "Kuning"],
    },
    {
        id: 12,
        type: "select",
        title: "Pilih ibukota Prancis",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Eiffel_Tower%2C_Paris_15_August_2014.jpg",
        required: true,
        options: [
            { id: 1, text: "Berlin" },
            { id: 2, text: "Paris" },
            { id: 3, text: "Madrid" },
            { id: 4, text: "Lisbon" },
        ],
        userAnswer: "",
        correctAnswer: "Paris",
    },
    {
        id: 13,
        type: "text",
        title: "Sebutkan satu nama pahlawan nasional Indonesia!",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Cut_Nyak_Dhien.jpg",
        required: true,
        userAnswer: "",
    },
    {
        id: 14,
        type: "date",
        title: "Kapan NASA pertama kali mendaratkan manusia di bulan?",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Neil_Armstrong_pose.jpg",
        required: true,
        userAnswer: "",
        correctAnswer: "1969-07-20",
    },
    {
        id: 15,
        type: "time",
        title: "Jam berapa biasanya kamu tidur?",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/68/Moon.jpg",
        required: false,
        userAnswer: "",
    },
];

