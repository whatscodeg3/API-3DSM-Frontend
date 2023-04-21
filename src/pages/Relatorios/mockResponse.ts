const mockResponse = [
    [
    {
        "cpf": "23830112823",
        "fullName": "Lucas Luca",
        "purchaseDate": "2023-03-28",
        "paymentValue": 1000.00,
        "installmentDueDate": "2023-04-21",
        "paymentDate": null,
        "creditDate": null,
        "installmentValue": 500.00
    },
    {
        "cpf": "16689765873",
        "fullName": "Kevin Levin",
        "purchaseDate": "2023-03-28",
        "paymentValue": 2000.00,
        "installmentDueDate": "2023-04-14",
        "paymentDate": null,
        "creditDate": null,
        "installmentValue": 1000.00
    },
    {
        "cpf": "49811726809",
        "fullName": "Matheus Teus",
        "purchaseDate": "2023-03-28",
        "paymentValue": 3000.00,
        "installmentDueDate": "2023-04-30",
        "paymentDate": "2023-04-21",
        "creditDate": null,
        "installmentValue": 1500.00
    },
    {
        "cpf": "97667329818",
        "fullName": "Thiago Ago",
        "purchaseDate": "2023-03-28",
        "paymentValue": 4000.00,
        "installmentDueDate": "2023-04-30",
        "paymentDate": "2023-04-19",
        "creditDate": "2023-04-21",
        "installmentValue": 2000.00
    },
    {
        "cpf": "35421353800",
        "fullName": "Pedro Edo",
        "purchaseDate": "2023-03-28",
        "paymentValue": 5000.00,
        "installmentDueDate": "2023-04-14",
        "paymentDate": "2023-04-20",
        "creditDate": "2023-04-22",
        "installmentValue": 2500.00
    }
],

    [
        {
            "cpf": "23830112823",
            "fullName": "Lucas Luca",
            "purchaseDate": "2023-03-28",
            "paymentValue": 1000.00,
            "installmentDueDate": "2023-04-21",
            "paymentDate": "2023-04-21",
            "creditDate": null,
            "installmentValue": 500.00
    },
        {
            "cpf": "16689765873",
            "fullName": "Kevin Levin",
            "purchaseDate": "2023-03-28",
            "paymentValue": 2000.00,
            "installmentDueDate": "2023-04-14",
            "paymentDate": "2023-04-19",
            "creditDate": null,
            "installmentValue": 1000.00
    },
        {
            "cpf": "49811726809",
            "fullName": "Matheus Teus",
            "purchaseDate": "2023-03-28",
            "paymentValue": 3000.00,
            "installmentDueDate": "2023-04-30",
            "paymentDate": "2023-04-19",
            "creditDate": null,
            "installmentValue": 1500.00
    },
        {
            "cpf": "97667329818",
            "fullName": "Thiago Ago",
            "purchaseDate": "2023-03-28",
            "paymentValue": 4000.00,
            "installmentDueDate": "2023-04-19",
            "paymentDate": "2023-04-21",
            "creditDate": null,
            "installmentValue": 2000.00
    },
        {
            "cpf": "35421353800",
            "fullName": "Pedro Edo",
            "purchaseDate": "2023-03-28",
            "paymentValue": 5000.00,
            "installmentDueDate": "2023-04-14",
            "paymentDate": "2023-04-13",
            "creditDate": null,
            "installmentValue": 2500.00
    }
    ],

    [
        {
            "cpf": "23830112823",
            "fullName": "Lucas Luca",
            "purchaseDate": "2023-03-28",
            "paymentValue": 1000.00,
            "installmentDueDate": "2023-04-21",
            "paymentDate": "2023-04-13",
            "creditDate": "2023-04-15",
            "installmentValue": 500.00
        },
        {
            "cpf": "16689765873",
            "fullName": "Kevin Levin",
            "purchaseDate": "2023-03-28",
            "paymentValue": 2000.00,
            "installmentDueDate": "2023-04-14",
            "paymentDate": "2023-04-13",
            "creditDate": "2023-04-15",
            "installmentValue": 1000.00
        },
        {
            "cpf": "49811726809",
            "fullName": "Matheus Teus",
            "purchaseDate": "2023-03-28",
            "paymentValue": 3000.00,
            "installmentDueDate": "2023-04-30",
            "paymentDate": "2023-04-19",
            "creditDate": "2023-04-21",
            "installmentValue": 1500.00
        },
        {
            "cpf": "97667329818",
            "fullName": "Thiago Ago",
            "purchaseDate": "2023-03-28",
            "paymentValue": 4000.00,
            "installmentDueDate": "2023-04-30",
            "paymentDate": "2023-04-19",
            "creditDate": "2023-04-21",
            "installmentValue": 2000.00
        },
        {
            "cpf": "35421353800",
            "fullName": "Pedro Edo",
            "purchaseDate": "2023-03-28",
            "paymentValue": 5000.00,
            "installmentDueDate": "2023-04-14",
            "paymentDate": "2023-04-20",
            "creditDate": "2023-04-22",
            "installmentValue": 2500.00
        },
        {
            "cpf": "35421353800",
            "fullName": "Pedro Edo",
            "purchaseDate": "2023-03-28",
            "paymentValue": 5000.00,
            "installmentDueDate": "2023-04-14",
            "paymentDate": "2023-04-20",
            "creditDate": "2023-04-22",
            "installmentValue": 2500.00
        }
    ]
]


export default mockResponse;

// public class ReportResponse {

//     private String cpf;

//     private String fullName;

//     private LocalDate purchaseDate;

//     private BigDecimal paymentValue;

//     private LocalDate installmentDueDate;

//     private LocalDate paymentDate;

//     private LocalDate creditDate;

//     private BigDecimal installmentValue;
// }