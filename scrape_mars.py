#import module
from bs4 import BeautifulSoup as bs
import requests
import pandas as pd

#create a scrape function
def scrape():
    url = "https://mars.nasa.gov/news/?page=1&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest"
    response = requests.get(url)
    soup = bs(response.text,'html.parser')
    list_text = soup.find_all('div', class_='slide')
    
    each_news = {}
    news = []
    for l in list_text:
            # Identify and return title of news
            news_title = l.find('div', class_="content_title").text.strip()
            # Identify and return paragraph of news
            news_p = l.find('div', class_ = "rollover_description_inner").text.strip()
            each_news["title"] = news_title
            each_news["summary"]=news_p
            news.append(each_news)   

    #JPL Mars Space Images
    #url of page to be scraped
    jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    # save response
    response2 = requests.get(jpl_url)
    # Create BeautifulSoup object; parse with 'html.parser'
    soup = bs(response2.text,'html.parser')
    # results are returned as an iterable list
    img_container = soup.find_all('div', class_='image_and_description_container')

    image_url_dict={}
    featured_image_url=[]
    #Loop through each list_text to find news titles and paragraph text
    for img in img_container:
            # Identify and return title of news
            image_url = img.find("img").attrs['src'].strip()
            image_fullurl = "https://www.jpl.nasa.gov" +image_url
            image_url_dict["image url"] = image_fullurl
            featured_image_url.append(image_url_dict)
    # Mars Weather
    #twitter url 
    twitter_url = "https://twitter.com/marswxreport?lang=en"
    response_twitter = requests.get(twitter_url)
    # Create BeautifulSoup object; parse with 'html.parser'
    soup = bs(response_twitter.text,'html.parser')
    tweets_container = soup.find_all("div", class_="js-tweet-text-container")
    mars_weather_dict={}
    mars_weather=[]
    #Loop through each list_text to find news titles and paragraph text
    for tweet in tweets_container:
            # Identify and return title of news
            mars_weather_each = tweet.find('p',class_="tweet-text").contents[0]
            mars_weather_dict["mars_weather"]=mars_weather_each
            # Print results only if title, price, and link are available
            mars_weather.append(mars_weather_dict)
    
    # Mars Facts
    marsfacts_url = "https://space-facts.com/mars/"
    response_marsfacts = requests.get(marsfacts_url)
    soup = bs(response_marsfacts.text,'html.parser')
    marsfacts_table = soup.find("table", class_ ="tablepress").find_all("tr")

    mars_property = []
    info = []
    i = 0
    for i in range(len(marsfacts_table)):
        key = marsfacts_table[i].contents[1].text
        value = marsfacts_table[i].contents[2].text.strip()
        mars_property.append(key)
        info.append(value)
    table_df = pd.DataFrame({"Property":mars_property,"Info":info},columns=['Property', 'Info'])
    
    # Mars Hemispheres
    #url
    marhemisphere_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    marhemisphere_response = requests.get(marhemisphere_url)
    soup=bs(marhemisphere_response.text,"html.parser")
    hemispheres = soup.find_all("div",class_="description")
    hemisphere_title = []
    for hemisphere in hemispheres:
        title = hemisphere.find("h3").text
        hemisphere_title.append(title)

    Cerberus_Hemisphere_url = "https://astrogeology.usgs.gov/search/map/Mars/Viking/cerberus_enhanced"
    Cerberus_Hemisphere_response = requests.get(Cerberus_Hemisphere_url)
    soup_ch=bs(Cerberus_Hemisphere_response.text,"html.parser")
    ch_img_url=soup_ch.find("div",class_="downloads").find("ul").find("li").find("a").attrs["href"]
    
    Schiaparelli_Hemisphere_url = "https://astrogeology.usgs.gov/search/map/Mars/Viking/schiaparelli_enhanced"
    Schiaparelli_Hemisphere_response = requests.get(Schiaparelli_Hemisphere_url)
    soup_sh=bs(Schiaparelli_Hemisphere_response.text,"html.parser")
    sh_img_url=soup_sh.find("div",class_="downloads").find("ul").find("li").find("a").attrs["href"]

    Syrtis_Major_Hemisphere_url = "https://astrogeology.usgs.gov/search/map/Mars/Viking/syrtis_major_enhanced"
    Syrtis_Major_Hemisphere_response = requests.get(Syrtis_Major_Hemisphere_url)
    soup_smh=bs(Syrtis_Major_Hemisphere_response.text,"html.parser")
    smh_img_url=soup_smh.find("div",class_="downloads").find("ul").find("li").find("a").attrs["href"]

    Valles_Marineris_Hemisphere_url = "https://astrogeology.usgs.gov/search/map/Mars/Viking/valles_marineris_enhanced"
    Valles_Marineris_Hemisphere_response = requests.get(Valles_Marineris_Hemisphere_url)
    soup_vmh=bs(Valles_Marineris_Hemisphere_response.text,"html.parser")
    vmh_img_url=soup_vmh.find("div",class_="downloads").find("ul").find("li").find("a").attrs["href"]

    hemisphere_image_urls = [
    {"title":hemisphere_title[0],"img_url":ch_img_url},
    {"title":hemisphere_title[1],"img_url":sh_img_url},
    {"title":hemisphere_title[2],"img_url":smh_img_url},
    {"title":hemisphere_title[3],"img_url":vmh_img_url}]

    scrape_dict={
        "news":news,
        "featured_image_url":featured_image_url,
        "mars_weather":mars_weather,
        "mars info":table_df,
        "hemisphere_image_urls":hemisphere_image_urls
    }
    return scrape_dict