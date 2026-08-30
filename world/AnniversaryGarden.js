import { Torii } from "./Torii.js";
import { CherryTree } from "./CherryTree.js";
import { Garden } from "./Garden.js";
import { AnniversaryTable } from "./AnniversaryTable.js";
import { JapaneseLantern } from "./JapaneseLantern.js";
import { Zabuton } from "./Zabuton.js";

export class AnniversaryGarden {

    constructor(scene) {

        // Torii
        new Torii(scene);

        // Cerezos
        new CherryTree(scene, 7.0, -7.5);
        new CherryTree(scene, 10.6, -7.5);

        // Flores
        new Garden(scene);

        // Mesa
        new AnniversaryTable(scene);

        // Cojines japoneses
        new Zabuton(scene, 7.8, -6.9);

        new Zabuton(scene, 10.2, -6.9);

        // Faroles japoneses
        new JapaneseLantern(scene, 4.8, -6.2);

        new JapaneseLantern(scene, 12.2, -6.2);

    }

}