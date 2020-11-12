import React from 'react'
import { sortable } from '@/components/sortable';
import DragAbleBox from './sortableStyle'
import SvgIcon from "@/components/public/svg";

class Item extends React.Component {
  render() {
    return (
      <li {...this.props}>
        {this.props.children}
      </li>
    )
  }
}

const SortableItem = sortable(Item);

class JuziCharts extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [
        "Gold",
        "Crimson",
        "Hotpink",
        "Blueviolet",
        "Cornflowerblue",
        "Skyblue",
        "Lightblue",
        "Aquamarine",
        "Burlywood",
        "Skyblue1",
        "Lightblue1",
        "Aquamarine1",
        "Burlywood1"
      ]
    }
  }

  onSortItems(items) {
    this.setState({
      list: items
    })
  }

  render() {
    const { list } = this.state
    return (
      <DragAbleBox>
        <ul>
          {
            list.map((t, i) => {
              return (
                <SortableItem
                  key={i}
                  onSortItems={(items) => this.onSortItems(items)}
                  items={list}
                  sortId={i}
                >
                  <p>{t}</p>
                  <div className='target'>
                    <SvgIcon iconClass='chart'></SvgIcon>
                  </div>
                </SortableItem>
              )
            })
          }
        </ul>
      </DragAbleBox>
    )
  }
}

export default JuziCharts