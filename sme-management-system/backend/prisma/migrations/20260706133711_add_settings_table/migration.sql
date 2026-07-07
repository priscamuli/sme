-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "businessName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "logo" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'KES',
    "taxRate" REAL NOT NULL DEFAULT 0,
    "receiptHeader" TEXT,
    "receiptFooter" TEXT,
    "autoPrint" BOOLEAN NOT NULL DEFAULT false,
    "printLogo" BOOLEAN NOT NULL DEFAULT true,
    "reorderLevel" INTEGER NOT NULL DEFAULT 5,
    "lowStockAlert" BOOLEAN NOT NULL DEFAULT true,
    "enableDiscounts" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
