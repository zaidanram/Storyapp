import "../../../sass/index.scss";
import "../../../sass/style.scss";
import { showFormattedDateTime } from "../../utils/datetime";
import header from "../component/container/header";
import footer from "../component/container/footer";
import listitem from "../component/list/listitem";

const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const fetchStory = await fetch('/data/data.json');
    const responseStory = await fetchStory.json();
    this._myStory = responseStory.listStory;
    this._populateStoryRecordToCard(this._myStory);
  },

  _populateStoryRecordToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(`Parameter listStory should be an object. The value is ${listStory}`);
    }
    if (!Array.isArray(listStory)) {
      throw new Error(`Parameter listStory should be an array. The value is ${listStory}`);
    }
    const recordBodyCard = document.querySelector('.home-container1');
    recordBodyCard.innerHTML = '';
    if (listStory.length <= 0) {
      recordBodyCard.innerHTML = this._templateEmptyBodyCard();
      return;
    }
    listStory.forEach((item, idx) => {
      recordBodyCard.innerHTML += this._templateBodyCard(idx, listStory[idx]);
    });
  },

  _templateBodyCard(index, storyRecord) {
    //ubah format datetime dari ISO 8601 menjadi HARI, TANGGAL BULAN TAHUN Pukul JAM:Menit:Detik
    const date = showFormattedDateTime(storyRecord.createdAt);
    return `
      <listitem-component 
        class="gallery-card3-gallery-card gallery-card3-root-class-name"
        image="${storyRecord.photoUrl}"
        name="${storyRecord.name}"
        description="${storyRecord.description}"
        createdAt="${date}"
      ></listitem-component>
    `;
  },

  _templateEmptyBodyCard() {
    return `
      <div class="text-center">Tidak ada list cerita</div>
    `;
  },
};

export default Dashboard;