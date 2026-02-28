import ComingSoon from "../../comingSoon"
import PageHeader from "../../../Components/commons/moleculs/PageHeader"

const PageLeave = ({ title }) => {
    return (
        <div>
            <PageHeader title={title} backTo="/home" />
            <div className="p-4">
                <ComingSoon />
            </div>
        </div>
    )
}

export default PageLeave