package com.onepieceai.onepiece_ai.Enum;

public enum FruitType {
    PARAMECIA("Paramecia"),
    ZOAN("Zoan"),
    LOGIA("Logia");

    private final String name;

    FruitType(String name) {
       this.name = name;;
    }

    public String getName() {
        return name;
    }

}
