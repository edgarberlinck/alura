//
//  ViewController.swift
//  eggplant-brownie
//
//  Created by Edgar Muniz Berlinck on 05/02/2018.
//  Copyright © 2018 Edgar Muniz Berlinck. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var nameField: UITextField!;
    @IBOutlet var happinessField: UITextField!;
    
    @IBAction func add () {
        let name = nameField.text;
        let happiness = happinessField.text;
        print ("eaten \(name) with happiness \(happiness)");
    }
    
}

