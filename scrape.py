
# Script Python pour scraper les levées de fonds sur "jaimelesstartups.fr"
# et mettre à jour un fichier CSV

import requests
from bs4 import BeautifulSoup
import csv
from datetime import datetime

URL = "https://www.jaimelesstartups.fr/liste-levee-de-fonds-startup-france/"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def fetch_levees():
    response = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(response.text, 'html.parser')
    articles = soup.select("article.liste-article")

    data = []
    for article in articles:
        try:
            nom = article.select_one("h2 a").text.strip()
            details = article.select_one(".excerpt p").text.strip()
            date_pub = article.select_one(".date").text.strip()
            date_iso = datetime.strptime(date_pub, "%d %B %Y").strftime("%Y-%m-%d")

            montant = "NC"
            secteur = "NC"

            # Recherche d'un montant dans le texte
            if "leve" in details.lower():
                for word in details.split():
                    if "€" in word or "M" in word or "K" in word:
                        montant = word
                        break

            data.append([
                nom,
                secteur,
                montant,
                date_iso,
                "NC",  # CA
                "NC",  # Effectif
                "NC"   # Site
            ])
        except Exception as e:
            print("Erreur lors du traitement d'un article:", e)

    return data

def save_to_csv(data, path="data/startups.csv"):
    header = ["Nom", "Secteur", "Montant Levé", "Date de Levée", "Chiffre d'Affaires", "Effectif", "Site Web"]
    with open(path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(data)

if __name__ == "__main__":
    startups = fetch_levees()
    save_to_csv(startups)
    print(f"{len(startups)} startups enregistrées.")
